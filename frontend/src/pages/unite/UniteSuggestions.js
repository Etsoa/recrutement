import React, { useState, useEffect } from 'react';
import { Button } from '../../components';
import { unitesService } from '../../services';
import '../../styles/UniteSuggestions.css';

const UniteSuggestions = () => {
  const [candidatsEligibles, setCandidatsEligibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedCandidat, setSelectedCandidat] = useState(null);

  useEffect(() => {
    fetchCandidatsEligibles();
  }, []);

  const fetchCandidatsEligibles = async () => {
    try {
      // Récupérer les candidats avec entretiens terminés et scores élevés
      const data = await unitesService.getCandidatsEligiblesPourRh();
      if (data.success) {
        setCandidatsEligibles(data.data);
      } else {
        setMessage(data.message || 'Erreur lors du chargement');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestToRh = async (candidat) => {
    try {
      const data = await unitesService.suggestToRh(
        candidat.id_unite_entretien, 
        candidat.id_candidat
      );
      
      if (data.success) {
        setMessage('Suggestion envoyée à la RH avec succès');
        setMessageType('success');
        // Retirer le candidat de la liste après suggestion
        setCandidatsEligibles(prev => 
          prev.filter(c => c.id_candidat !== candidat.id_candidat)
        );
      } else {
        setMessage(data.message || 'Erreur lors de l\'envoi de la suggestion');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erreur serveur');
      setMessageType('error');
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const getScoreColor = (score) => {
    if (score >= 16) return '#176c2fff'; // Vert
    if (score >= 12) return '#f39c12'; // Orange
    return '#e74c3c'; // Rouge
  };

  if (loading) {
    return (
      <div className="rh-suggestions-container">
        <div className="loading">Chargement des candidats éligibles...</div>
      </div>
    );
  }

  return (
    <div className="rh-suggestions-container">
      <div className="rh-suggestions-header">
        <h1>Candidats à Suggérer à la RH</h1>
        <p className="description">
          Liste des candidats ayant terminé leur entretien mais non suggérés automatiquement au RH.
          Vous pouvez les suggérer manuellement pour un entretien RH.
        </p>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>

      {candidatsEligibles.length > 0 ? (
        <div className="suggestions-list">
          {candidatsEligibles.map((candidat) => (
            <div key={candidat.id_candidat} className="suggestion-card">
              <div className="suggestion-header">
                <div className="candidat-basic-info">
                  <h3>{candidat.prenom} {candidat.nom}</h3>
                  <span className="candidat-email">{candidat.email}</span>
                </div>
                <div className="suggestion-meta">
                  <span className="entretien-date">
                    Entretien: {formatDateTime(candidat.date_entretien)}
                  </span>
                  <span 
                    className="score-badge"
                    style={{ backgroundColor: getScoreColor(candidat.score) }}
                  >
                    Score: {candidat.score}/20
                  </span>
                </div>
              </div>

              <div className="candidat-details">
                <div className="candidat-info-grid">
                  <div className="info-item">
                    <strong>Poste visé:</strong>
                    <span>{candidat.poste_nom}</span>
                  </div>
                  <div className="info-item">
                    <strong>Contact:</strong>
                    <span>{candidat.contact}</span>
                  </div>
                  <div className="info-item">
                    <strong>Ville:</strong>
                    <span>{candidat.ville}</span>
                  </div>
                  <div className="info-item">
                    <strong>Genre:</strong>
                    <span>{candidat.genre}</span>
                  </div>
                  <div className="info-item">
                    <strong>Âge:</strong>
                    <span>{candidat.age} ans</span>
                  </div>
                  <div className="info-item">
                    <strong>Durée entretien:</strong>
                    <span>{candidat.duree} minutes</span>
                  </div>
                </div>

                {candidat.langues && candidat.langues.length > 0 && (
                  <div className="competences-section">
                    <h4>Langues:</h4>
                    <div className="tags">
                      {candidat.langues.map((langue, idx) => (
                        <span key={idx} className="tag">{langue}</span>
                      ))}
                    </div>
                  </div>
                )}

                {candidat.qualites && candidat.qualites.length > 0 && (
                  <div className="competences-section">
                    <h4>Qualités:</h4>
                    <div className="tags">
                      {candidat.qualites.map((qualite, idx) => (
                        <span key={idx} className="tag">{qualite}</span>
                      ))}
                    </div>
                  </div>
                )}

                {candidat.experiences && candidat.experiences.length > 0 && (
                  <div className="competences-section">
                    <h4>Expériences:</h4>
                    <div className="experiences-list">
                      {candidat.experiences.map((exp, idx) => (
                        <div key={idx} className="experience-item">
                          <span className="experience-domain">{exp.domaine}</span>
                          <span className="experience-duration">
                            ({exp.date_debut} - {exp.date_fin})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {candidat.formations && candidat.formations.length > 0 && (
                  <div className="competences-section">
                    <h4>Formations:</h4>
                    <div className="formations-list">
                      {candidat.formations.map((formation, idx) => (
                        <div key={idx} className="formation-item">
                          <span className="formation-niveau">{formation.niveau}</span>
                          <span className="formation-filiere">{formation.filiere}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="suggestion-actions">
                <div className="action-buttons">
                  <Button
                    variant="primary"
                    onClick={() => handleSuggestToRh(candidat)}
                  >
                    Suggérer à la RH
                  </Button>
                  
                  {candidat.cv && (
                    <Button
                      variant="secondary"
                      onClick={() => window.open(`/uploads/cv/${candidat.cv}`, '_blank')}
                    >
                      Voir CV
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCandidat(
                      selectedCandidat?.id_candidat === candidat.id_candidat ? null : candidat
                    )}
                  >
                    {selectedCandidat?.id_candidat === candidat.id_candidat ? 'Masquer' : 'Détails'}
                  </Button>
                </div>
              </div>

              {selectedCandidat?.id_candidat === candidat.id_candidat && (
                <div className="candidat-extended-details">
                  <h4>Détails complets</h4>
                  <div className="extended-info">
                    <div className="info-section">
                      <h5>Informations personnelles</h5>
                      <p><strong>Date de naissance:</strong> {candidat.date_naissance}</p>
                      <p><strong>Situation matrimoniale:</strong> {candidat.situation_matrimoniale}</p>
                      <p><strong>Nombre d'enfants:</strong> {candidat.nombre_enfants}</p>
                      <p><strong>CIN:</strong> {candidat.cin}</p>
                    </div>
                    
                    <div className="info-section">
                      <h5>Informations sur l'entretien</h5>
                      <p><strong>Date de l'entretien:</strong> {formatDateTime(candidat.date_entretien)}</p>
                      <p><strong>Durée:</strong> {candidat.duree} minutes</p>
                      <p><strong>Score obtenu:</strong> {candidat.score}/20</p>
                      <p><strong>Statut:</strong> {candidat.statut_entretien}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-suggestions">
          <h3>Aucun candidat à suggérer</h3>
          <p>
            Tous les candidats ayant terminé leur entretien ont déjà été suggérés au RH.
          </p>
          <div className="suggestions-info">
            <h4>Pour qu'un candidat apparaisse ici :</h4>
            <ul>
              <li>Il doit avoir terminé son entretien avec votre unité</li>
              <li>Il doit avoir reçu un score d'entretien</li>
              <li>Il ne doit pas encore avoir été suggéré au RH</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniteSuggestions;