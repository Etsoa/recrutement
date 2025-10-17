import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '../../router/useNavigateHelper';
import { Container, Section } from '../../components/LayoutUnite';
import Button from '../../components/Button';
import { annoncesService, unitesService } from '../../services';
import { SessionManager } from '../../utils/sessionManager';
import { ErrorHandler } from '../../utils/errorHandler';
import '../../styles/ListeAnnonces.css';

const ListeAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    ville: 'all',
    genre: 'all',
    ageBand: 'all', // all, lt30, 30to40, 40to50, 50plus
  });
  const navigate = useNavigate();

  const fetchAnnonces = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUnite = unitesService.getCurrentUnite();
      if (!currentUnite || !currentUnite.id_unite) {
        throw new Error('Session unité invalide');
      }
      const response = await annoncesService.getAnnoncesByUnite(currentUnite.id_unite);
      if (!response || !response.success) {
        throw new Error(response?.message || 'Erreur lors de la récupération des annonces');
      }
      setAnnonces(response.data || []);
      SessionManager.extendSession('uniteSession');
    } catch (err) {
      const handledError = ErrorHandler.handleApiError(err, 'Chargement des annonces');
      setError(handledError.message);
      ErrorHandler.logError(handledError, 'ListeAnnonces.fetchAnnonces');
      if (handledError.type === ErrorHandler.ERROR_TYPES.AUTHENTICATION) {
        SessionManager.clearSession('uniteSession');
        navigate('/login-unites');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // Vérifier la session avant de charger les données
    if (!SessionManager.isSessionValid('uniteSession')) {
      navigate('/login-unites');
      return;
    }
    fetchAnnonces();
  }, [navigate, fetchAnnonces]);

  const handleVoirDossiers = (idAnnonce) => {
    if (!idAnnonce) {
      setError('ID d\'annonce invalide');
      return;
    }
    navigate(`/back-office/details-annonce/${idAnnonce}`);
  };

  const handleCreateAnnonce = () => {
    navigate('/back-office/create-annonce');
  };

  const handleVilleFilter = (ville) => {
    setFilters(prev => ({ ...prev, ville }));
  };

  const handleGenreFilter = (genre) => {
    setFilters(prev => ({ ...prev, genre }));
  };

  const handleAgeBandFilter = (ageBand) => {
    setFilters(prev => ({ ...prev, ageBand }));
  };

  const handleSearchFilter = (search) => {
    setFilters(prev => ({ ...prev, search }));
  };

  // Filtrer les annonces
  const villes = React.useMemo(() => {
    const set = new Set();
    annonces.forEach(a => { if (a?.Ville?.valeur) set.add(a.Ville.valeur); });
    return Array.from(set);
  }, [annonces]);

  const genres = React.useMemo(() => {
    const set = new Set();
    annonces.forEach(a => { if (a?.Genre?.valeur) set.add(a.Genre.valeur); });
    return Array.from(set);
  }, [annonces]);

  const intersects = (minA, maxA, minB, maxB) => {
    if (minA == null && maxA == null) return true;
    if (minB == null && maxB == null) return true;
    const aMin = minA ?? -Infinity;
    const aMax = maxA ?? Infinity;
    const bMin = minB ?? -Infinity;
    const bMax = maxB ?? Infinity;
    return aMin <= bMax && bMin <= aMax;
  };

  const filteredAnnonces = annonces.filter(annonce => {
    const p = (annonce.Poste?.valeur || '').toLowerCase();
    const v = (annonce.Ville?.valeur || '').toLowerCase();
    const g = (annonce.Genre?.valeur || '').toLowerCase();
    const q = (filters.search || '').toLowerCase();

    const matchesSearch = !filters.search || p.includes(q) || v.includes(q) || g.includes(q);
    const matchesVille = filters.ville === 'all' || annonce.Ville?.valeur === filters.ville;
    const matchesGenre = filters.genre === 'all' || annonce.Genre?.valeur === filters.genre;

    let bandMin = null, bandMax = null;
    switch (filters.ageBand) {
      case 'lt30': bandMin = null; bandMax = 30; break;
      case '30to40': bandMin = 30; bandMax = 40; break;
      case '40to50': bandMin = 40; bandMax = 50; break;
      case '50plus': bandMin = 50; bandMax = null; break;
      default: bandMin = null; bandMax = null; break;
    }
    const matchesAge = filters.ageBand === 'all' || intersects(annonce.age_min, annonce.age_max, bandMin, bandMax);

    return matchesSearch && matchesVille && matchesGenre && matchesAge;
  });

  if (loading) {
    return (
      <Container>
        <Section>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des annonces...</p>
          </div>
        </Section>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Section>
          <div className="error-container">
            <h2>Erreur</h2>
            <p>{error}</p>
            <div className="error-actions">
              <Button onClick={fetchAnnonces}>
                Réessayer
              </Button>
              <Button variant="secondary" onClick={() => navigate('/login-unites')}>
                Retour à la connexion
              </Button>
            </div>
          </div>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
        <div className="liste-annonces">
          <div className="liste-annonces__header">
            <h1>Liste des Annonces</h1>
            <p className="liste-annonces__subtitle">
              {filteredAnnonces.length} annonce{filteredAnnonces.length > 1 ? 's' : ''}
              {(filters.search || filters.ville !== 'all' || filters.genre !== 'all' || filters.ageBand !== 'all') ? ' (filtrées)' : ''}
            </p>
          </div>

          <div className="liste-annonces__filters">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Rechercher par poste ou ville..."
                value={filters.search}
                onChange={(e) => handleSearchFilter(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select 
                value={filters.ville}
                onChange={(e) => handleVilleFilter(e.target.value)}
                className="status-filter"
              >
                <option value="all">Toutes les villes</option>
                {villes.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <select 
                value={filters.genre}
                onChange={(e) => handleGenreFilter(e.target.value)}
                className="status-filter"
              >
                <option value="all">Tous les genres</option>
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <select 
                value={filters.ageBand}
                onChange={(e) => handleAgeBandFilter(e.target.value)}
                className="status-filter"
              >
                <option value="all">Tous âges</option>
                <option value="lt30">Moins de 30</option>
                <option value="30to40">30 à 40</option>
                <option value="40to50">40 à 50</option>
                <option value="50plus">50 et plus</option>
              </select>
            </div>
            {/* <div className="filter-group">
              <Button onClick={handleCreateAnnonce}>
                Créer une annonce
              </Button>
            </div> */}
          </div>

          {filteredAnnonces.length === 0 ? (
            <div className="empty-state">
              <h3>Aucune annonce trouvée</h3>
              <p>
                {(filters.search || filters.ville !== 'all' || filters.genre !== 'all' || filters.ageBand !== 'all')
                  ? 'Aucune annonce ne correspond à vos critères de recherche.' 
                  : 'Il n\'y a actuellement aucune annonce publiée.'
                }
              </p>
              {(filters.search || filters.ville !== 'all' || filters.genre !== 'all' || filters.ageBand !== 'all') && (
                <Button 
                  variant="secondary" 
                  onClick={() => setFilters({ search: '', ville: 'all', genre: 'all', ageBand: 'all' })}
                >
                  Effacer les filtres
                </Button>
              )}
            </div>
          ) : (
            <div className="annonces-grid">
              {filteredAnnonces.map((annonce) => (
                <div key={annonce.id_annonce} className="annonce-card">
                  <div className="annonce-card__header">
                      <h3 className="annonce-card__poste">
                        {annonce.Poste?.valeur || 'Poste non défini'}
                      </h3>
                      <span className="annonce-card__id">
                        #{annonce.id_annonce}
                      </span>
                    </div>

                    <div className="annonce-card__details">
                      <div className="annonce-detail">
                        <span className="annonce-detail__label">Genre :</span>
                        <span className="annonce-detail__value">
                          {annonce.Genre?.valeur || 'Non spécifié'}
                        </span>
                      </div>

                      <div className="annonce-detail">
                        <span className="annonce-detail__label">Ville :</span>
                        <span className="annonce-detail__value">
                          {annonce.Ville?.valeur || 'Non spécifiée'}
                        </span>
                      </div>

                      <div className="annonce-detail">
                        <span className="annonce-detail__label">Âge :</span>
                        <span className="annonce-detail__value">
                          {annonce.age_min && annonce.age_max
                            ? `${annonce.age_min} - ${annonce.age_max} ans`
                            : annonce.age_min
                            ? `À partir de ${annonce.age_min} ans`
                            : annonce.age_max
                            ? `Jusqu'à ${annonce.age_max} ans`
                            : 'Non spécifié'
                          }
                        </span>
                      </div>
                    </div>

                    <div className="annonce-card__actions">
                      <Button
                        variant="primary"
                        onClick={() => handleVoirDossiers(annonce.id_annonce)}
                        fullWidth
                      >
                        Voir les détails de l'annonce
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      </Container>
    );
  };

export default ListeAnnonces;