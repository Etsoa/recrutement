import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Section } from '../components/Layout';
import Button from '../components/Button';
import annoncesService from '../services/annoncesService';
import ficheCandidatService from '../services/ficheCandidatService';
import '../styles/DetailsAnnonce.css';

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

  useEffect(() => {
    const fetchAnnonceDetails = async () => {
      try {
        setLoading(true);
        const response = await annoncesService.getAnnonceById(idAnnonce);
        // L'API retourne { message, data, success }
        setAnnonceData(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement des détails:', err);
        setError('Erreur lors du chargement des détails de l\'annonce');
      } finally {
        setLoading(false);
      }
    };

    if (idAnnonce) {
      fetchAnnonceDetails();
    }
  }, [idAnnonce]);

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
    navigate(`/fiche-candidat/${candidatId}`);
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
              <Button onClick={() => navigate('/liste-annonces')}>
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
              <Button variant="ghost" onClick={() => navigate('/liste-annonces')}>
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

            {/* Candidats */}
            <div className="candidats-section">
              <h3>Candidats postulants ({candidatsDetails ? candidatsDetails.length : 0})</h3>
              
              {candidatsDetails && candidatsDetails.length > 0 ? (
                <div className="candidats-grid">
                  {candidatsDetails
                    .filter(candidatData => candidatData?.candidat && candidatData?.candidat?.Tier)
                    .map((candidatData, index) => {
                    const candidat = candidatData.candidat;
                    const tiers = candidat.Tier;
                    
                    // Déterminer les statuts QCM et entretien
                    const qcmStatus = ficheCandidatService.getQcmStatus(
                      candidatData.envoisQcm || [], 
                      candidatData.reponsesQcm?.length > 0 ? candidatData.reponsesQcm[0].reponses : []
                    );
                    
                    const entretienStatus = ficheCandidatService.getEntretienStatus(
                      candidatData.unite_entretiens || []
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