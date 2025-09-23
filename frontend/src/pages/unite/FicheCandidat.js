import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Layout, { Container, Section, Grid } from '../../components/LayoutUnite';
import Button from '../../components/Button';
import { ficheCandidatService, annoncesService } from '../../services';
import '../../styles/FicheCandidat.css';

const FicheCandidat = () => {
  const { idCandidat } = useParams();
  const [candidatData, setCandidatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const navigate = useNavigate();
  const ficheRef = useRef(null);

  // Fonction pour exporter en PDF
  const exportToPDF = async () => {
    try {
      setActionLoading(prev => ({ ...prev, pdf: true }));
      
      if (ficheRef.current) {
        // Créer un canvas à partir de l'élément
        const canvas = await html2canvas(ficheRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          height: ficheRef.current.scrollHeight,
          width: ficheRef.current.scrollWidth
        });

        // Créer le PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Ajouter la première page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Ajouter des pages supplémentaires si nécessaire
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Télécharger le PDF
        const candidatName = candidatData?.candidat?.nom || 'candidat';
        const candidatPrenom = candidatData?.candidat?.prenoms || '';
        const fileName = `Fiche_${candidatName}_${candidatPrenom}_${new Date().getTime()}.pdf`;
        
        pdf.save(fileName);
      }
    } catch (err) {
      console.error('Erreur lors de l\'export PDF:', err);
      alert('Erreur lors de l\'export PDF');
    } finally {
      setActionLoading(prev => ({ ...prev, pdf: false }));
    }
  };

  useEffect(() => {
    const fetchCandidatDetails = async () => {
      try {
        setLoading(true);
        const response = await ficheCandidatService.getCandidatById(idCandidat);
        // L'API retourne { message, data, success }
        setCandidatData(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement du candidat:', err);
        setError('Erreur lors du chargement du dossier candidat');
      } finally {
        setLoading(false);
      }
    };

    if (idCandidat) {
      fetchCandidatDetails();
    }
  }, [idCandidat]);

  const handleSendQcm = async () => {
    try {
      setActionLoading(prev => ({ ...prev, qcm: true }));
      await annoncesService.sendQcmCandidat(idCandidat);
      // Recharger les données pour mettre à jour l'état
      const updatedResponse = await ficheCandidatService.getCandidatById(idCandidat);
      setCandidatData(updatedResponse.data);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du QCM:', err);
      alert('Erreur lors de l\'envoi du QCM');
    } finally {
      setActionLoading(prev => ({ ...prev, qcm: false }));
    }
  };

  const handleSendEntretien = async () => {
    try {
      setActionLoading(prev => ({ ...prev, entretien: true }));
      // Date par défaut: dans 7 jours, durée 60 minutes
      const dateEntretien = new Date();
      dateEntretien.setDate(dateEntretien.getDate() + 7);
      
      await annoncesService.sendUniteEntretien(idCandidat, dateEntretien.toISOString().split('T')[0], 60);
      // Recharger les données pour mettre à jour l'état
      const updatedResponse = await ficheCandidatService.getCandidatById(idCandidat);
      setCandidatData(updatedResponse.data);
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la convocation:', err);
      alert('Erreur lors de l\'envoi de la convocation d\'entretien');
    } finally {
      setActionLoading(prev => ({ ...prev, entretien: false }));
    }
  };

  if (loading) {
    return (
        <Container>
          <Section>
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Chargement du dossier candidat...</p>
            </div>
          </Section>
        </Container>
    );
  }

  if (error || !candidatData) {
    return (
        <Container>
          <Section>
            <div className="error-container">
              <h2>Erreur</h2>
              <p>{error || 'Candidat introuvable'}</p>
              <Button onClick={() => navigate(-1)}>
                Retour
              </Button>
            </div>
          </Section>
        </Container>
    );
  }

  const { candidat, employe, statutsEmploye, langues, qualites, experiences, niveauxFiliere, autresAnnonces, envois_qcm, unite_entretiens } = candidatData;
  const tiers = candidat?.Tier;
  
  // Vérifications de sécurité
  if (!candidat || !tiers) {
    return (
        <Container>
          <Section>
            <div className="error-container">
              <h2>Erreur</h2>
              <p>Données candidat incomplètes</p>
              <Button onClick={() => navigate(-1)}>
                Retour
              </Button>
            </div>
          </Section>
        </Container>
    );
  }
  
  const age = ficheCandidatService.calculateAge(tiers.date_naissance);

  // Déterminer les statuts QCM et entretien pour l'annonce actuelle
  const qcmStatus = ficheCandidatService.getQcmStatus(
    envois_qcm, 
    envois_qcm?.length > 0 ? envois_qcm[0].reponses : []
  );
  
  const entretienStatus = ficheCandidatService.getEntretienStatus(unite_entretiens);

  return (
      <Container>
        <Section>
          <div className="fiche-candidat" ref={ficheRef}>
            {/* Header */}
            <div className="fiche-candidat__header">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                ← Retour
              </Button>
              <h1>Dossier Candidat</h1>
              <div className="fiche-candidat__header-actions">
                <Button 
                  variant="outline" 
                  onClick={exportToPDF}
                  disabled={actionLoading.pdf}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {actionLoading.pdf ? (
                    <>📄 Export en cours...</>
                  ) : (
                    <>📄 Exporter PDF</>
                  )}
                </Button>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="candidat-profile">
              <div className="candidat-profile__info">
                <div className="candidat-profile__main">
                  <h2>{tiers.prenom} {tiers.nom}</h2>
                  <div className="candidat-profile__details">
                    <div className="detail-row">
                      <span className="detail-label">Âge:</span>
                      <span className="detail-value">{age ? `${age} ans` : 'Non renseigné'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{tiers.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Contact:</span>
                      <span className="detail-value">{tiers.contact}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">CIN:</span>
                      <span className="detail-value">{tiers.cin}</span>
                    </div>
                    {tiers.nombre_enfants !== null && (
                      <div className="detail-row">
                        <span className="detail-label">Nombre d'enfants:</span>
                        <span className="detail-value">{tiers.nombre_enfants}</span>
                      </div>
                    )}
                  </div>
                </div>
                {tiers.photo && (
                  <div className="candidat-profile__photo">
                    <img src={tiers.photo} alt={`${tiers.prenom} ${tiers.nom}`} />
                  </div>
                )}
              </div>

              {/* Actions principales */}
              <div className="candidat-profile__actions">
                <div className="status-section">
                  <div className="status-item">
                    <span className="status-label">QCM:</span>
                    <span className={`status-value status--${qcmStatus.type}`}>
                      {qcmStatus.text}
                    </span>
                  </div>
                  
                  <div className="status-item">
                    <span className="status-label">Entretien:</span>
                    <span className={`status-value status--${entretienStatus.type}`}>
                      {entretienStatus.text}
                    </span>
                  </div>

                  <div className="status-item">
                    <span className="status-label">Match:</span>
                    <span className="status-value">
                      {candidatData.pourcentage || 0}%
                    </span>
                  </div>
                </div>

                <div className="action-buttons">
                  {qcmStatus.action === 'send' && (
                    <Button
                      variant="primary"
                      loading={actionLoading.qcm}
                      onClick={handleSendQcm}
                    >
                      Envoyer QCM
                    </Button>
                  )}

                  {entretienStatus.action === 'schedule' && (
                    <Button
                      variant="secondary"
                      loading={actionLoading.entretien}
                      onClick={handleSendEntretien}
                    >
                      Planifier entretien
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Statut employé si existe */}
            {employe && (
              <div className="employe-section">
                <h3>Informations Employé</h3>
                <div className="employe-info">
                  <div className="detail-row">
                    <span className="detail-label">Statut actuel:</span>
                    <span className="detail-value">
                      {employe.type_status_employe?.valeur || 'Non défini'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Poste:</span>
                    <span className="detail-value">
                      {employe.poste?.valeur || 'Non défini'}
                    </span>
                  </div>
                </div>

                {statutsEmploye && statutsEmploye.length > 0 && (
                  <div className="statuts-timeline">
                    <h4>Historique des statuts</h4>
                    {statutsEmploye.map((status, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-date">
                          {ficheCandidatService.formatDate(status.date_changement)}
                        </div>
                        <div className="timeline-content">
                          {status.type_status_employe?.valeur}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Compétences et qualifications */}
            <Grid columns={2} className="competences-grid">
              {/* Niveaux et filières */}
              {niveauxFiliere && niveauxFiliere.length > 0 && (
                <div className="competence-section">
                  <h3>Formation</h3>
                  <div className="competence-list">
                    {niveauxFiliere.map((nf, index) => (
                      <div key={index} className="competence-item">
                        <strong>{nf.Niveau?.valeur}</strong> en {nf.Filiere?.valeur}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Langues */}
              {langues && langues.length > 0 && (
                <div className="competence-section">
                  <h3>Langues</h3>
                  <div className="competence-list">
                    {langues.map((lang, index) => (
                      <div key={index} className="competence-item">
                        {lang.Langue?.valeur}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Qualités */}
              {qualites && qualites.length > 0 && (
                <div className="competence-section">
                  <h3>Qualités</h3>
                  <div className="competence-list">
                    {qualites.map((qual, index) => (
                      <div key={index} className="competence-item">
                        {qual.Qualite?.valeur}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expériences */}
              {experiences && experiences.length > 0 && (
                <div className="competence-section">
                  <h3>Expériences</h3>
                  <div className="competence-list">
                    {experiences.map((exp, index) => (
                      <div key={index} className="experience-item">
                        <div className="experience-domain">
                          <strong>{exp.Domaine?.valeur}</strong>
                        </div>
                        <div className="experience-duration">
                          Du {ficheCandidatService.formatDate(exp.date_debut)} 
                          {exp.date_fin ? ` au ${ficheCandidatService.formatDate(exp.date_fin)}` : ' à aujourd\'hui'}
                        </div>
                        <div className="experience-total">
                          {ficheCandidatService.calculateExperienceDuration(exp.date_debut, exp.date_fin)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Grid>

            {/* Autres candidatures */}
            {autresAnnonces && autresAnnonces.length > 1 && (
              <div className="autres-candidatures">
                <h3>Autres candidatures</h3>
                <div className="candidatures-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Annonce</th>
                        <th>Poste</th>
                        <th>Ville</th>
                        <th>Genre requis</th>
                        <th>CV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {autresAnnonces
                        ?.filter(candidature => candidature?.candidature?.id_candidat !== parseInt(idCandidat))
                        ?.map((candidature, index) => (
                        <tr key={index}>
                          <td>#{candidature?.annonce?.id_annonce || 'N/A'}</td>
                          <td>{candidature?.annonce?.Poste?.valeur || 'N/A'}</td>
                          <td>{candidature?.annonce?.Ville?.valeur || 'N/A'}</td>
                          <td>{candidature?.annonce?.Genre?.valeur || 'N/A'}</td>
                          <td>
                            {candidature?.candidature?.cv ? (
                              <a href={candidature.candidature.cv} target="_blank" rel="noopener noreferrer">
                                Voir CV
                              </a>
                            ) : (
                              'CV indisponible'
                            )}
                          </td>
                        </tr>
                      )) || []}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Historique QCM */}
            {envois_qcm && envois_qcm.length > 0 && (
              <div className="qcm-historique">
                <h3>Historique QCM</h3>
                {envois_qcm.map((envoi, index) => (
                  <div key={index} className="qcm-envoi">
                    <div className="qcm-envoi__header">
                      <span>Envoyé le {ficheCandidatService.formatDate(envoi.envoi.date_envoi)}</span>
                      <span>Token: {envoi.envoi.token}</span>
                    </div>
                    {envoi.reponses && envoi.reponses.length > 0 && (
                      <div className="qcm-reponses">
                        <h4>Réponses ({envoi.reponses.length})</h4>
                        {envoi.reponses.map((rep, repIndex) => (
                          <div key={repIndex} className="qcm-reponse">
                            <div className="qcm-reponse__info">
                              <span>Score: {rep.score}/100</span>
                              <span>Durée: {rep.duree} minutes</span>
                              {rep.debut && rep.fin && (
                                <span>
                                  Du {new Date(rep.debut).toLocaleString()} 
                                  au {new Date(rep.fin).toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="qcm-reponse__contenu">
                              Réponse: {rep.reponse}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Historique entretiens */}
            {unite_entretiens && unite_entretiens.length > 0 && (
              <div className="entretiens-historique">
                <h3>Historique des entretiens</h3>
                {unite_entretiens.map((entretien, index) => (
                  <div key={index} className="entretien-item">
                    <div className="entretien-info">
                      <div className="detail-row">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">
                          {ficheCandidatService.formatDate(entretien.unite_entretien.date_entretien)}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Durée:</span>
                        <span className="detail-value">
                          {entretien.unite_entretien.duree} minutes
                        </span>
                      </div>
                    </div>

                    {entretien.score_unite_entretien && entretien.score_unite_entretien.length > 0 && (
                      <div className="entretien-scores">
                        <h4>Scores</h4>
                        {entretien.score_unite_entretien.map((score, scoreIndex) => (
                          <div key={scoreIndex} className="score-item">
                            <span>Score: {score.score}/100</span>
                            <span>Date: {ficheCandidatService.formatDate(score.date_score)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {entretien.status_unite_entretien && entretien.status_unite_entretien.length > 0 && (
                      <div className="entretien-statuts">
                        <h4>Statuts</h4>
                        {entretien.status_unite_entretien.map((status, statusIndex) => (
                          <div key={statusIndex} className="status-timeline-item">
                            <span className="timeline-date">
                              {ficheCandidatService.formatDate(status.date_changement)}
                            </span>
                            <span className="timeline-content">
                              {status.type_status_entretien?.valeur}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </Container>
  );
};

export default FicheCandidat;