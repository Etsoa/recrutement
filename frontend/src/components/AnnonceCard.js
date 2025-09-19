import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import '../styles/AnnonceCard.css';

const AnnonceCard = ({ annonce, hideActions = false }) => {
  const navigate = useNavigate();
  
  if (!annonce) return null;

  const handlePostuler = () => {
    // Naviguer vers la page de candidature avec l'ID de l'annonce
    navigate(`/candidature/${annonce.id_annonce}`);
  };

  // Calculer l'âge requis
  const ageRange = `${annonce.age_min} - ${annonce.age_max} ans`;
  
  // Formater les expériences requises
  const experiencesText = annonce.ExperienceAnnonces?.map(exp => 
    `${exp.Domaine?.valeur} (${exp.nombre_annee} an${exp.nombre_annee > 1 ? 's' : ''})`
  ).join(' • ') || 'Non spécifiée';

  // Formater les langues requises
  const languesText = annonce.LangueAnnonces?.map(la => 
    la.Langue?.valeur
  ).join(' • ') || 'Non spécifiées';

  // Formater les qualités requises
  const qualitesText = annonce.QualiteAnnonces?.map(qa => 
    qa.Qualite?.valeur
  ).join(' • ') || 'Non spécifiées';

  // Formater les formations requises
  const formationsText = annonce.NiveauFiliereAnnonces?.map(nfa =>
    `${nfa.Niveau?.valeur} en ${nfa.Filiere?.valeur}`
  ).join(' • ') || 'Non spécifiée';

  return (
    <div className="annonce-card">
      <div className="annonce-header">
        <div className="title-section">
          <h2 className="annonce-title">{annonce.Poste?.valeur}</h2>
          <div className="annonce-meta">
            <span className="annonce-location">📍 {annonce.Ville?.valeur}</span>
            <span className="annonce-age">👤 {ageRange}</span>
            <span className="annonce-genre">⚥ {annonce.Genre?.valeur}</span>
          </div>
        </div>
      </div>
      
      <div className="annonce-content">
        <div className="info-grid">
          <div className="info-section">
            <h3>💼 Expérience requise</h3>
            <p>{experiencesText}</p>
          </div>
          
          <div className="info-section">
            <h3>🗣️ Langues & Compétences</h3>
            <p>{languesText}</p>
          </div>
          
          <div className="info-section">
            <h3>⭐ Qualités recherchées</h3>
            <p>{qualitesText}</p>
          </div>
          
          <div className="info-section">
            <h3>🎓 Formation requise</h3>
            <p>{formationsText}</p>
          </div>
        </div>
      </div>

      {!hideActions && (
        <div className="annonce-footer">
          <Button 
            variant="primary"
            size="large"
            onClick={handlePostuler}
          >
            <span>Postuler maintenant</span>
            <span className="arrow">→</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnnonceCard;