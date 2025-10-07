import React, { useState, useEffect } from 'react';
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
    status: 'all',
    search: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier la session avant de charger les données
    if (!SessionManager.isSessionValid('uniteSession')) {
      navigate('/login-unites');
      return;
    }

    fetchAnnonces();
  }, [navigate]);

  const fetchAnnonces = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Vérifier l'unité connectée
      const currentUnite = unitesService.getCurrentUnite();
      if (!currentUnite || !currentUnite.id_unite) {
        throw new Error('Session unité invalide');
      }
      
      // Récupérer les annonces de l'unité
      const response = await annoncesService.getAnnoncesByUnite(currentUnite.id_unite);
      
      if (!response || !response.success) {
        throw new Error(response?.message || 'Erreur lors de la récupération des annonces');
      }
      
      setAnnonces(response.data || []);
      
      // Étendre la session sur activité réussie
      SessionManager.extendSession('uniteSession');
      
    } catch (err) {
      const handledError = ErrorHandler.handleApiError(err, 'Chargement des annonces');
      setError(handledError.message);
      ErrorHandler.logError(handledError, 'ListeAnnonces.fetchAnnonces');
      
      // Si erreur d'authentification, rediriger
      if (handledError.type === ErrorHandler.ERROR_TYPES.AUTHENTICATION) {
        SessionManager.clearSession('uniteSession');
        navigate('/login-unites');
      }
    } finally {
      setLoading(false);
    }
  };

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

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleSearchFilter = (search) => {
    setFilters(prev => ({ ...prev, search }));
  };

  // Filtrer les annonces
  const filteredAnnonces = annonces.filter(annonce => {
    const matchesStatus = filters.status === 'all' || 
      (annonce.status_actuel && annonce.status_actuel.toLowerCase().includes(filters.status.toLowerCase()));
    
    const matchesSearch = !filters.search || 
      (annonce.poste && annonce.poste.toLowerCase().includes(filters.search.toLowerCase())) ||
      (annonce.ville && annonce.ville.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesStatus && matchesSearch;
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
      <Section>
        <div className="liste-annonces">
          <div className="liste-annonces__header">
            <h1>Liste des Annonces</h1>
            <p className="liste-annonces__subtitle">
              {filteredAnnonces.length} annonce{filteredAnnonces.length > 1 ? 's' : ''} 
              {filters.status !== 'all' || filters.search ? ' (filtrées)' : ''}
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
                value={filters.status} 
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="status-filter"
              >
                <option value="all">Tous les statuts</option>
                <option value="publie">Publiées</option>
                <option value="en cours">En cours</option>
                <option value="refuse">Refusées</option>
              </select>
            </div>
            <div className="filter-group">
              <Button onClick={handleCreateAnnonce}>
                Créer une annonce
              </Button>
            </div>
          </div>

          {filteredAnnonces.length === 0 ? (
            <div className="empty-state">
              <h3>Aucune annonce trouvée</h3>
              <p>
                {filters.status !== 'all' || filters.search 
                  ? 'Aucune annonce ne correspond à vos critères de recherche.' 
                  : 'Il n\'y a actuellement aucune annonce publiée.'
                }
              </p>
              {(filters.status !== 'all' || filters.search) && (
                <Button 
                  variant="secondary" 
                  onClick={() => setFilters({ status: 'all', search: '' })}
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
        </Section>
      </Container>
    );
  };

export default ListeAnnonces;