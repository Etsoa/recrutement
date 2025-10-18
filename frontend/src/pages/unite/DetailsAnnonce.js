import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from '../../router/useNavigateHelper';
import Layout, { Container, Section } from '../../components/LayoutUnite';
import Button from '../../components/Button';
import { annoncesService, ficheCandidatService, parametresService } from '../../services';
import '../../styles/DetailsAnnonce.css';

const DetailsAnnonce = () => {
  const { idAnnonce } = useParams();
  const [annonceData, setAnnonceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [currentQcmPage, setCurrentQcmPage] = useState(0);
  const QCM_PER_PAGE = 1;
  const navigate = useNavigate();

  // États pour le filtrage et les paramètres
  const [parametres, setParametres] = useState(null);
  const [filteredCandidats, setFilteredCandidats] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // États des filtres
  const [filters, setFilters] = useState({
    // Recherche par nom/prénom
    searchText: '',
    
    // Tri par âge
    sortByAge: '', // 'asc' ou 'desc'
    
    // Filtres par sélection
    genres: [],
    villes: [],
    situationsMatrimoniales: [],
    langues: [],
    qualites: [],
    
    // Filtres par plage
    ageMin: '',
    ageMax: '',
    nombreEnfantsMin: '',
    nombreEnfantsMax: '',
    
    // Filtres complexes (ajout JS)
    niveauxFilieres: [], // {niveau: id, filiere: id}
    experiences: [], // {domaine: id, anneesMin: nombre}
  });

  // Fonction pour calculer l'âge
  const calculateAge = (dateNaissance) => {
    if (!dateNaissance) return null;
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les détails de l'annonce et les paramètres en parallèle
        const [annonceResponse, parametresResponse] = await Promise.all([
          annoncesService.getAnnonceById(idAnnonce),
          parametresService.getAllParametres()
        ]);
        
        // L'API retourne { message, data, success }
        const data = annonceResponse.data || {};

        // Helpers de déduplication
        const uniqueBy = (arr, keyFn) => {
          const seen = new Set();
          const out = [];
          for (const item of arr || []) {
            const key = keyFn(item);
            if (!seen.has(key)) { seen.add(key); out.push(item); }
          }
          return out;
        };

        const normalized = {
          ...data,
          niveauxFiliere: uniqueBy(data.niveauxFiliere, (nf) => `${nf.id_niveau ?? nf.Niveau?.id_niveau ?? ''}-${nf.id_filiere ?? nf.Filiere?.id_filiere ?? ''}-${nf.Niveau?.valeur ?? ''}-${nf.Filiere?.valeur ?? ''}`),
          experiences: uniqueBy(data.experiences, (exp) => `${exp.id_experience_annonce ?? ''}-${exp.id_domaine ?? exp.Domaine?.id_domaine ?? ''}-${exp.nombre_annee ?? ''}-${exp.Domaine?.valeur ?? ''}`),
          langues: uniqueBy(data.langues, (l) => `${l.id_langue ?? l.Langue?.id_langue ?? ''}-${l.Langue?.valeur ?? ''}`),
          qualites: uniqueBy(data.qualites, (q) => `${q.id_qualite ?? q.Qualite?.id_qualite ?? ''}-${q.Qualite?.valeur ?? ''}`),
          statuts: uniqueBy(data.statuts, (s) => {
            const d = s.date_changement ? new Date(s.date_changement).toISOString() : '';
            const v = s.id_type_status_annonce ?? s.TypeStatusAnnonce?.id_type_status_annonce ?? s.TypeStatusAnnonce?.valeur ?? '';
            return `${d}-${v}`;
          })
        };

        setAnnonceData(normalized);
        setParametres(parametresResponse.data);
        
        // Initialiser la liste filtrée avec tous les candidats
        setFilteredCandidats(normalized?.candidatsDetails || []);
        
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    if (idAnnonce) {
      fetchData();
    }
  }, [idAnnonce]);

  // Logique de filtrage et tri
  const applyFilters = () => {
    if (!annonceData?.candidatsDetails) return;

    let filtered = [...annonceData.candidatsDetails];

    // 1. Filtrage par texte de recherche (nom + prénom)
    if (filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const fullName = `${item.candidat.Tier.nom} ${item.candidat.Tier.prenom}`.toLowerCase();
        return fullName.includes(searchLower);
      });
    }

    // 2. Filtrage par genre
    if (filters.genres.length > 0) {
      filtered = filtered.filter(item => 
        filters.genres.includes(item.candidat.Tier.id_genre)
      );
    }

    // 3. Filtrage par ville
    if (filters.villes.length > 0) {
      filtered = filtered.filter(item => 
        filters.villes.includes(item.candidat.Tier.id_ville)
      );
    }

    // 4. Filtrage par situation matrimoniale
    if (filters.situationsMatrimoniales.length > 0) {
      filtered = filtered.filter(item => 
        filters.situationsMatrimoniales.includes(item.candidat.Tier.id_situation_matrimoniale)
      );
    }

    // 5. Filtrage par langues (le candidat doit avoir AU MOINS UNE des langues sélectionnées)
    if (filters.langues.length > 0) {
      filtered = filtered.filter(item => 
        item.langues.some(langue => filters.langues.includes(langue.id_langue))
      );
    }

    // 6. Filtrage par qualités (le candidat doit avoir AU MOINS UNE des qualités sélectionnées)
    if (filters.qualites.length > 0) {
      filtered = filtered.filter(item => 
        item.qualites.some(qualite => filters.qualites.includes(qualite.id_qualite))
      );
    }

    // 7. Filtrage par âge
    filtered = filtered.filter(item => {
      const age = calculateAge(item.candidat.Tier.date_naissance);
      if (age === null) return false;

      const ageMin = filters.ageMin ? parseInt(filters.ageMin) : 0;
      const ageMax = filters.ageMax ? parseInt(filters.ageMax) : 200;

      return age >= ageMin && age <= ageMax;
    });

    // 8. Filtrage par nombre d'enfants
    filtered = filtered.filter(item => {
      const nombreEnfants = item.candidat.Tier.nombre_enfants || 0;
      const enfantsMin = filters.nombreEnfantsMin ? parseInt(filters.nombreEnfantsMin) : 0;
      const enfantsMax = filters.nombreEnfantsMax ? parseInt(filters.nombreEnfantsMax) : 100;

      return nombreEnfants >= enfantsMin && nombreEnfants <= enfantsMax;
    });

    // 9. Filtrage par niveaux/filières (combiné)
    if (filters.niveauxFilieres.length > 0) {
      filtered = filtered.filter(item => 
        filters.niveauxFilieres.some(filtre => 
          item.niveauxFiliere.some(nf => 
            nf.id_niveau === filtre.niveau && nf.id_filiere === filtre.filiere
          )
        )
      );
    }

    // 10. Filtrage par expériences (domaine + années minimum)
    if (filters.experiences.length > 0) {
      filtered = filtered.filter(item => 
        filters.experiences.some(filtre => {
          return item.experiences.some(exp => {
            if (exp.id_domaine !== filtre.domaine) return false;
            
            // Calculer le nombre d'années d'expérience
            const dateDebut = new Date(exp.date_debut);
            const dateFin = exp.date_fin ? new Date(exp.date_fin) : new Date();
            const anneesExperience = Math.floor((dateFin - dateDebut) / (365.25 * 24 * 60 * 60 * 1000));
            
            return anneesExperience >= filtre.anneesMin;
          });
        })
      );
    }

    // 11. Tri par âge
    if (filters.sortByAge) {
      filtered.sort((a, b) => {
        const ageA = calculateAge(a.candidat.Tier.date_naissance) || 0;
        const ageB = calculateAge(b.candidat.Tier.date_naissance) || 0;
        
        return filters.sortByAge === 'asc' ? ageA - ageB : ageB - ageA;
      });
    }

    setFilteredCandidats(filtered);
  };

  // Appliquer les filtres quand ils changent
  useEffect(() => {
    applyFilters();
  }, [filters, annonceData]);

  // Fonctions pour gérer les filtres
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMultiSelectChange = (key, value, isChecked) => {
    setFilters(prev => ({
      ...prev,
      [key]: isChecked 
        ? [...prev[key], value]
        : prev[key].filter(item => item !== value)
    }));
  };

  const addNiveauFiliere = () => {
    const niveau = document.getElementById('niveau-filiere-niveau').value;
    const filiere = document.getElementById('niveau-filiere-filiere').value;
    
    if (niveau && filiere) {
      const newItem = { niveau: parseInt(niveau), filiere: parseInt(filiere) };
      setFilters(prev => ({
        ...prev,
        niveauxFilieres: [...prev.niveauxFilieres, newItem]
      }));
    }
  };

  const removeNiveauFiliere = (index) => {
    setFilters(prev => ({
      ...prev,
      niveauxFilieres: prev.niveauxFilieres.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    const domaine = document.getElementById('experience-domaine').value;
    const anneesMin = document.getElementById('experience-annees').value;
    
    if (domaine && anneesMin) {
      const newItem = { domaine: parseInt(domaine), anneesMin: parseInt(anneesMin) };
      setFilters(prev => ({
        ...prev,
        experiences: [...prev.experiences, newItem]
      }));
    }
  };

  const removeExperience = (index) => {
    setFilters(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchText: '',
      sortByAge: '',
      genres: [],
      villes: [],
      situationsMatrimoniales: [],
      langues: [],
      qualites: [],
      ageMin: '',
      ageMax: '',
      nombreEnfantsMin: '',
      nombreEnfantsMax: '',
      niveauxFilieres: [],
      experiences: [],
    });
  };

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleSendQcm = async (candidatId) => {
    try {
      setActionLoading(prev => ({ ...prev, [`qcm_${candidatId}`]: true }));
      await annoncesService.sendQcmCandidat(candidatId);
      
      // Recharger les données pour mettre à jour l'état
      const updatedResponse = await annoncesService.getAnnonceById(idAnnonce);
      setAnnonceData(updatedResponse.data);
      
      showNotification('QCM envoyé avec succès ! Le candidat recevra un email avec le lien.', 'success');
    } catch (err) {
      console.error('Erreur lors de l\'envoi du QCM:', err);
      showNotification('Erreur lors de l\'envoi du QCM. Veuillez réessayer.', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [`qcm_${candidatId}`]: false }));
    }
  };

  const handleSendEntretien = async (candidatId) => {
    try {
      setActionLoading(prev => ({ ...prev, [`entretien_${candidatId}`]: true }));
      
      // Date par défaut: dans 7 jours, durée 60 minutes
      const dateEntretien = new Date();
      dateEntretien.setDate(dateEntretien.getDate() + 7);
      
      await annoncesService.sendUniteEntretien(candidatId, dateEntretien.toISOString().split('T')[0], 60);
      
      // Recharger les données pour mettre à jour l'état
      const updatedResponse = await annoncesService.getAnnonceById(idAnnonce);
      setAnnonceData(updatedResponse.data);
      
      const dateFormatted = dateEntretien.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      showNotification(`Convocation d'entretien envoyée ! Date prévue : ${dateFormatted}`, 'success');
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la convocation:', err);
      showNotification('Erreur lors de l\'envoi de la convocation. Veuillez réessayer.', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [`entretien_${candidatId}`]: false }));
    }
  };

  const handleVoirDossierComplet = (candidatId) => {
    navigate(`/back-office/fiche-candidat/${candidatId}`);
  };

  if (loading) {
    return (
        <Container>
          <Section>
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Chargement des détails de l'annonce...</p>
            </div>
          </Section>
        </Container>
    );
  }

  if (error || !annonceData) {
    return (
        <Container>
          <Section>
            <div className="error-container">
              <h2>Erreur</h2>
              <p>{error || 'Annonce introuvable'}</p>
              <Button onClick={() => navigate('/back-office/liste-annonces')}>
                Retour à la liste
              </Button>
            </div>
          </Section>
        </Container>
    );
  }

  const { annonce, langues, qualites, experiences, niveauxFiliere, statuts, candidatsDetails, qcms } = annonceData;

  return (
      <Container>
        <Section>
          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="notifications-container">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification notification--${notification.type}`}
                >
                  <span className="notification-icon">
                    {notification.type === 'success' ? '✅' : '❌'}
                  </span>
                  <span className="notification-message">{notification.message}</span>
                  <button 
                    className="notification-close"
                    onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="details-annonce">
            {/* Header avec bouton retour */}
            <div className="details-annonce__header">
              <Button variant="ghost" onClick={() => navigate('/back-office/liste-annonces')}>
                ← Retour à la liste
              </Button>
              <h1>Détails de l'annonce #{annonce.id_annonce}</h1>
            </div>

            {/* Informations de l'annonce */}
            <div className="annonce-info">
              <div className="annonce-info__main">
                <h2>{annonce.Poste?.valeur || 'Poste non défini'}</h2>
                <div className="annonce-basic-info">
                    <span>
                        Âge: {annonce.age_min && annonce.age_max 
                        ? `${annonce.age_min} - ${annonce.age_max} ans` 
                        : 'Non spécifié'}
                  </span>
                  <span>Genre: {annonce.Genre?.valeur}</span>
                  <span>Ville: {annonce.Ville?.valeur}</span>
                  
                </div>
              </div>
            </div>

            {/* Détails de l'annonce */}
            <div className="annonce-details-grid">
              {/* Niveaux et filières */}
              {niveauxFiliere && niveauxFiliere.length > 0 && (
                <div className="details-section">
                  <h3>Niveaux et Filières requis</h3>
                  <ul>
                    {niveauxFiliere.map((nf, index) => (
                      <li key={index}>
                        {nf.Niveau?.valeur} en {nf.Filiere?.valeur}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expériences */}
              {experiences && experiences.length > 0 && (
                <div className="details-section">
                  <h3>Expériences requises</h3>
                  <ul>
                    {experiences.map((exp, index) => (
                      <li key={index}>
                        {exp.nombre_annee} an{exp.nombre_annee > 1 ? 's' : ''} en {exp.Domaine?.valeur}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Langues */}
              {langues && langues.length > 0 && (
                <div className="details-section">
                  <h3>Langues requises</h3>
                  <ul>
                    {langues.map((lang, index) => (
                      <li key={index}>{lang.Langue?.valeur}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualités */}
              {qualites && qualites.length > 0 && (
                <div className="details-section">
                  <h3>Qualités recherchées</h3>
                  <ul>
                    {qualites.map((qual, index) => (
                      <li key={index}>{qual.Qualite?.valeur}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Historique de l'annonce */}
            {statuts && statuts.length > 0 && (
              <div className="details-section">
                <h3>Historique de l'annonce</h3>
                <div className="historique-list">
                  {statuts.map((status, index) => (
                    <div key={index} className="historique-item">
                      <span className="historique-date">
                        {ficheCandidatService.formatDate(status.date_changement)}
                      </span>
                      <span className="historique-status">
                        {status.TypeStatusAnnonce?.valeur}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QCMs de l'annonce */}
            {qcms && qcms.length > 0 && (
              <div className="details-section qcm-section">
                <h3>Questions du QCM ({qcms.length})</h3>
                <div className="qcm-container-compact">
                  <div className="qcm-navigation-elegant">
                    <button
                      className={`qcm-nav-btn qcm-nav-btn--prev ${currentQcmPage === 0 ? 'qcm-nav-btn--disabled' : ''}`}
                      onClick={() => setCurrentQcmPage(Math.max(0, currentQcmPage - 1))}
                      disabled={currentQcmPage === 0}
                    >
                      <span className="qcm-nav-icon">‹</span>
                      <span className="qcm-nav-label">Précédent</span>
                    </button>
                    
                    <div className="qcm-page-indicator">
                      <div className="qcm-page-counter">
                        <span className="qcm-current-page">{currentQcmPage + 1}</span>
                        <span className="qcm-separator">/</span>
                        <span className="qcm-total-pages">{qcms.length}</span>
                      </div>
                    </div>
                    
                    <button
                      className={`qcm-nav-btn qcm-nav-btn--next ${currentQcmPage >= qcms.length - 1 ? 'qcm-nav-btn--disabled' : ''}`}
                      onClick={() => setCurrentQcmPage(Math.min(qcms.length - 1, currentQcmPage + 1))}
                      disabled={currentQcmPage >= qcms.length - 1}
                    >
                      <span className="qcm-nav-label">Suivant</span>
                      <span className="qcm-nav-icon">›</span>
                    </button>
                  </div>

                  {qcms[currentQcmPage] && (
                    <div className="qcm-item-compact">
                      <div className="qcm-question-compact">
                        <strong>Q{currentQcmPage + 1}:</strong> {qcms[currentQcmPage].question?.intitule}
                      </div>
                      <div className="qcm-reponses-compact">
                        {qcms[currentQcmPage].reponses && qcms[currentQcmPage].reponses.map((rep, repIndex) => (
                          <div key={repIndex} className={`qcm-reponse-compact ${rep.modalite ? 'correct' : 'incorrect'}`}>
                            <span className="qcm-reponse-text-compact">{rep.reponse}</span>
                            <span className={`qcm-reponse-icon-compact ${rep.modalite ? 'icon-correct' : 'icon-incorrect'}`}>
                              {rep.modalite ? '✓' : '✗'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Interface de filtrage */}
            <div className="filters-section">
              <div className="filters-header">
                <Button 
                  onClick={() => setShowFilters(!showFilters)}
                  style={{ marginBottom: '15px' }}
                >
                  {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'} 
                  ({filteredCandidats.length} candidat{filteredCandidats.length !== 1 ? 's' : ''})
                </Button>
              </div>

              {showFilters && parametres && (
                <div className="filters-container" style={{ 
                  border: '1px solid #ddd', 
                  padding: '20px', 
                  marginBottom: '20px',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}>
                  {/* Recherche par nom */}
                  <div className="filter-group">
                    <label><strong>Rechercher par nom/prénom :</strong></label>
                    <input 
                      type="text"
                      placeholder="Nom ou prénom..."
                      value={filters.searchText}
                      onChange={(e) => handleFilterChange('searchText', e.target.value)}
                      style={{ width: '300px', padding: '8px', marginLeft: '10px' }}
                    />
                  </div>

                  {/* Tri par âge */}
                  <div className="filter-group" style={{ marginTop: '15px' }}>
                    <label><strong>Tri par âge :</strong></label>
                    <select 
                      value={filters.sortByAge}
                      onChange={(e) => handleFilterChange('sortByAge', e.target.value)}
                      style={{ marginLeft: '10px', padding: '8px' }}
                    >
                      <option value="">Aucun tri</option>
                      <option value="asc">Âge croissant</option>
                      <option value="desc">Âge décroissant</option>
                    </select>
                  </div>

                  {/* Filtres par plage */}
                  <div className="filter-group" style={{ marginTop: '15px' }}>
                    <label><strong>Âge :</strong></label>
                    <input 
                      type="number"
                      placeholder="Min"
                      value={filters.ageMin}
                      onChange={(e) => handleFilterChange('ageMin', e.target.value)}
                      style={{ width: '80px', padding: '5px', margin: '0 5px' }}
                    />
                    <span> à </span>
                    <input 
                      type="number"
                      placeholder="Max"
                      value={filters.ageMax}
                      onChange={(e) => handleFilterChange('ageMax', e.target.value)}
                      style={{ width: '80px', padding: '5px', margin: '0 5px' }}
                    />
                  </div>

                  <div className="filter-group" style={{ marginTop: '15px' }}>
                    <label><strong>Nombre d'enfants :</strong></label>
                    <input 
                      type="number"
                      placeholder="Min"
                      value={filters.nombreEnfantsMin}
                      onChange={(e) => handleFilterChange('nombreEnfantsMin', e.target.value)}
                      style={{ width: '80px', padding: '5px', margin: '0 5px' }}
                    />
                    <span> à </span>
                    <input 
                      type="number"
                      placeholder="Max"
                      value={filters.nombreEnfantsMax}
                      onChange={(e) => handleFilterChange('nombreEnfantsMax', e.target.value)}
                      style={{ width: '80px', padding: '5px', margin: '0 5px' }}
                    />
                  </div>

                  {/* Filtres par checkbox */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    
                    {/* Genres */}
                    <div className="filter-group">
                      <label><strong>Genres :</strong></label>
                      <div style={{ marginTop: '5px' }}>
                        {parametres.genres?.map(genre => (
                          <label key={genre.id_genre} style={{ display: 'block', margin: '3px 0' }}>
                            <input 
                              type="checkbox"
                              checked={filters.genres.includes(genre.id_genre)}
                              onChange={(e) => handleMultiSelectChange('genres', genre.id_genre, e.target.checked)}
                            />
                            <span style={{ marginLeft: '5px' }}>{genre.valeur}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Villes */}
                    <div className="filter-group">
                      <label><strong>Villes :</strong></label>
                      <div style={{ marginTop: '5px' }}>
                        {parametres.villes?.map(ville => (
                          <label key={ville.id_ville} style={{ display: 'block', margin: '3px 0' }}>
                            <input 
                              type="checkbox"
                              checked={filters.villes.includes(ville.id_ville)}
                              onChange={(e) => handleMultiSelectChange('villes', ville.id_ville, e.target.checked)}
                            />
                            <span style={{ marginLeft: '5px' }}>{ville.valeur}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Langues */}
                    <div className="filter-group">
                      <label><strong>Langues :</strong></label>
                      <div style={{ marginTop: '5px' }}>
                        {parametres.langues?.map(langue => (
                          <label key={langue.id_langue} style={{ display: 'block', margin: '3px 0' }}>
                            <input 
                              type="checkbox"
                              checked={filters.langues.includes(langue.id_langue)}
                              onChange={(e) => handleMultiSelectChange('langues', langue.id_langue, e.target.checked)}
                            />
                            <span style={{ marginLeft: '5px' }}>{langue.valeur}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Qualités */}
                    <div className="filter-group">
                      <label><strong>Qualités :</strong></label>
                      <div style={{ marginTop: '5px' }}>
                        {parametres.qualites?.map(qualite => (
                          <label key={qualite.id_qualite} style={{ display: 'block', margin: '3px 0' }}>
                            <input 
                              type="checkbox"
                              checked={filters.qualites.includes(qualite.id_qualite)}
                              onChange={(e) => handleMultiSelectChange('qualites', qualite.id_qualite, e.target.checked)}
                            />
                            <span style={{ marginLeft: '5px' }}>{qualite.valeur}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ajout de Niveau/Filière */}
                  <div className="filter-group" style={{ marginTop: '20px', padding: '15px', border: '1px dashed #ccc' }}>
                    <label><strong>Ajouter un niveau/filière :</strong></label>
                    <div style={{ marginTop: '10px' }}>
                      <select id="niveau-filiere-niveau" style={{ marginRight: '10px', padding: '5px' }}>
                        <option value="">Sélectionner un niveau</option>
                        {parametres.niveaux?.map(niveau => (
                          <option key={niveau.id_niveau} value={niveau.id_niveau}>
                            {niveau.valeur}
                          </option>
                        ))}
                      </select>
                      <select id="niveau-filiere-filiere" style={{ marginRight: '10px', padding: '5px' }}>
                        <option value="">Sélectionner une filière</option>
                        {parametres.filieres?.map(filiere => (
                          <option key={filiere.id_filiere} value={filiere.id_filiere}>
                            {filiere.valeur}
                          </option>
                        ))}
                      </select>
                      <Button onClick={addNiveauFiliere} style={{ padding: '5px 15px' }}>
                        Ajouter
                      </Button>
                    </div>
                    {filters.niveauxFilieres.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <strong>Critères niveau/filière :</strong>
                        {filters.niveauxFilieres.map((item, index) => {
                          const niveau = parametres.niveaux?.find(n => n.id_niveau === item.niveau);
                          const filiere = parametres.filieres?.find(f => f.id_filiere === item.filiere);
                          return (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                              <span>{niveau?.valeur} - {filiere?.valeur}</span>
                              <Button 
                                onClick={() => removeNiveauFiliere(index)}
                                style={{ marginLeft: '10px', padding: '2px 8px', fontSize: '12px' }}
                              >
                                Supprimer
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Ajout d'Expérience */}
                  <div className="filter-group" style={{ marginTop: '20px', padding: '15px', border: '1px dashed #ccc' }}>
                    <label><strong>Ajouter une expérience :</strong></label>
                    <div style={{ marginTop: '10px' }}>
                      <select id="experience-domaine" style={{ marginRight: '10px', padding: '5px' }}>
                        <option value="">Sélectionner un domaine</option>
                        {parametres.domaines?.map(domaine => (
                          <option key={domaine.id_domaine} value={domaine.id_domaine}>
                            {domaine.valeur}
                          </option>
                        ))}
                      </select>
                      <input 
                        type="number"
                        id="experience-annees"
                        placeholder="Années min"
                        style={{ marginRight: '10px', padding: '5px', width: '100px' }}
                      />
                      <Button onClick={addExperience} style={{ padding: '5px 15px' }}>
                        Ajouter
                      </Button>
                    </div>
                    {filters.experiences.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <strong>Critères d'expérience :</strong>
                        {filters.experiences.map((item, index) => {
                          const domaine = parametres.domaines?.find(d => d.id_domaine === item.domaine);
                          return (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                              <span>{domaine?.valeur} - {item.anneesMin} an{item.anneesMin > 1 ? 's' : ''} min</span>
                              <Button 
                                onClick={() => removeExperience(index)}
                                style={{ marginLeft: '10px', padding: '2px 8px', fontSize: '12px' }}
                              >
                                Supprimer
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Bouton pour effacer tous les filtres */}
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button onClick={clearAllFilters} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                      Effacer tous les filtres
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Candidats */}
            <div className="candidats-section">
              <h3>Candidats postulants ({filteredCandidats ? filteredCandidats.length : 0})</h3>
              
              {filteredCandidats && filteredCandidats.length > 0 ? (
                <div className="candidats-grid">
                  {filteredCandidats
                    .filter(candidatData => candidatData?.candidat && candidatData?.candidat?.Tier)
                    .map((candidatData, index) => {
                    const candidat = candidatData.candidat;
                    const tiers = candidat.Tier;
                    
                    // Déterminer les statuts QCM et entretien
                    const qcmStatus = ficheCandidatService.getQcmStatus(
                      candidatData.envoisQcm || [], 
                      candidatData.reponsesQcm?.length > 0 ? candidatData.reponsesQcm[0].reponses : [],
                      candidatData.score_qcm // Score calculé par le backend
                    );
                    
                    const entretienStatus = ficheCandidatService.getEntretienStatus(
                      candidatData.unite_entretiens || [],
                      candidatData.score_entretien // Score calculé par le backend
                    );

                    // Calculer l'âge à partir de la date de naissance
                    const calculateAge = (dateNaissance) => {
                      if (!dateNaissance) return null;
                      const today = new Date();
                      const birthDate = new Date(dateNaissance);
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const monthDiff = today.getMonth() - birthDate.getMonth();
                      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                      }
                      return age;
                    };

                    const age = calculateAge(tiers.date_naissance);

                    return (
                      <div key={candidat.id_candidat} className={`cv-miniature candidat-miniature cv-miniature--animation-delay-${index % 3}`}>
                        {/* Header avec photo à gauche et pourcentage à droite */}
                        <div className="candidat-header">
                          <div className="candidat-photo-container">
                            {tiers.photo ? (
                              <img src={tiers.photo} alt={`${tiers.prenom} ${tiers.nom}`} className="candidat-photo" />
                            ) : (
                              <div className="candidat-photo" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(44, 62, 80, 0.1)',
                                color: 'var(--color-primary)',
                                fontSize: 'var(--font-size-md)',
                                fontWeight: 'var(--font-weight-bold)'
                              }}>
                                {`${tiers.prenom?.charAt(0) || ''}${tiers.nom?.charAt(0) || ''}`.toUpperCase()}
                              </div>
                            )}
                          </div>
                          
                          <div className="candidat-match-percentage" onClick={() => {
                            // Action optionnelle au clic sur le pourcentage
                            console.log(`Détails du match pour ${tiers.prenom} ${tiers.nom}:`, candidatData.pourcentage);
                          }}>
                            {candidatData.pourcentage || 0}%
                          </div>
                        </div>

                        {/* Section centrale: Informations candidat */}
                        <div className="candidat-info">
                          <h3 className="candidat-name">
                            {tiers.prenom} {tiers.nom}
                          </h3>
                          {age && (
                            <p className="candidat-age">
                              {age} ans
                            </p>
                          )}
                          <p className="candidat-details-line">
                            <span className="detail-icon">👤</span>
                            {annonce.Genre?.valeur || 'Genre non renseigné'}
                          </p>
                          <p className="candidat-details-line">
                            <span className="detail-icon">📍</span>
                            {annonce.Ville?.valeur || 'Ville non renseignée'}
                          </p>
                          <p className="candidat-details-line">
                            <span className="detail-icon">📧</span>
                            {tiers.email || 'Email non renseigné'}
                          </p>
                        </div>

                        {/* Actions QCM, Entretien, Dossier en bas */}
                        <div className="cv-miniature__actions">
                          <div className="candidat-actions-grid">
                            {/* QCM et Entretien côte à côte en haut */}
                            <div className="candidat-actions-top">
                              <div className="candidat-action-block candidat-action-block--top">
                                <div className="candidat-action-header">
                                  <span className="candidat-action-label">QCM</span>
                                  <span className={`candidat-action-status candidat-action-status--${qcmStatus.type}`}>
                                    {qcmStatus.label}
                                  </span>
                                </div>
                                {qcmStatus.action === 'send' ? (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    loading={actionLoading[`qcm_${candidat.id_candidat}`]}
                                    onClick={() => handleSendQcm(candidat.id_candidat)}
                                    className="candidat-action-btn"
                                  >
                                    📧 Envoyer
                                  </Button>
                                ) : (
                                  <span className="candidat-action-value">{qcmStatus.text}</span>
                                )}
                              </div>
                              
                              <div className="candidat-action-block candidat-action-block--top">
                                <div className="candidat-action-header">
                                  <span className="candidat-action-label">Entretien</span>
                                  <span className={`candidat-action-status candidat-action-status--${entretienStatus.type}`}>
                                    {entretienStatus.label}
                                  </span>
                                </div>
                                {entretienStatus.action === 'schedule' && qcmStatus.action === 'completed' ? (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    loading={actionLoading[`entretien_${candidat.id_candidat}`]}
                                    onClick={() => handleSendEntretien(candidat.id_candidat)}
                                    className="candidat-action-btn"
                                  >
                                    📅 Planifier
                                  </Button>
                                ) : (
                                  <span className="candidat-action-value">{entretienStatus.text}</span>
                                )}
                              </div>
                            </div>

                            {/* Bouton Dossier en bas sur toute la largeur */}
                            <div className="candidat-actions-bottom">
                              <div className="candidat-action-block candidat-action-block--bottom">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleVoirDossierComplet(candidat.id_candidat)}
                                  className="candidat-action-btn candidat-action-btn--full"
                                >
                                  👁️ Voir dossier complet
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-candidats">
                  <p>Aucun candidat n'a postulé pour cette annonce.</p>
                </div>
              )}
            </div>
          </div>
        </Section>
      </Container>
  );
};

export default DetailsAnnonce;