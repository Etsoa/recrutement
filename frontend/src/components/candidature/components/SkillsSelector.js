import React from 'react';

const SkillsSelector = ({ formData, updateFormData, errors = {} }) => {
  // Langues disponibles
  const languesDisponibles = [
    'Malagasy', 'Français', 'Anglais', 'Allemand', 'Espagnol', 
    'Italien', 'Portugais', 'Chinois', 'Japonais', 'Arabe'
  ];

  // Gestion des langues (checkbox)
  const handleLangueToggle = (langue) => {
    const langues = [...(formData.langues || [])];
    const index = langues.findIndex(l => l.langue === langue);
    
    if (index > -1) {
      langues.splice(index, 1);
    } else {
      langues.push({ langue });
    }
    updateFormData({ langues });
  };

  // Qualités disponibles
  const qualitesDisponibles = [
    'Leadership', 'Travail en équipe', 'Communication', 'Créativité', 
    'Résolution de problèmes', 'Adaptabilité', 'Gestion du temps', 
    'Autonomie', 'Rigueur', 'Polyvalence', 'Initiative', 'Persévérance'
  ];

  // Gestion des qualités (checkbox)
  const handleQualiteToggle = (qualite) => {
    const qualites = [...(formData.qualites || [])];
    const index = qualites.findIndex(q => q.qualite === qualite);
    
    if (index > -1) {
      qualites.splice(index, 1);
    } else {
      qualites.push({ qualite });
    }
    updateFormData({ qualites });
  };

  return (
    <>
      {/* Section Langues */}
      <div className="section">
        <h3>Langues maîtrisées</h3>
        <p className="section-description">Sélectionnez les langues que vous maîtrisez</p>
        
        <div className="competences-container">
          <div className="competences-grid">
            {languesDisponibles.map(langue => (
              <label key={langue} className="competence-checkbox">
                <input
                  type="checkbox"
                  checked={formData.langues?.some(l => l.langue === langue) || false}
                  onChange={() => handleLangueToggle(langue)}
                />
                <span className="checkmark"></span>
                <span className="competence-text">{langue}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Section Qualités */}
      <div className="section">
        <h3>Qualités professionnelles</h3>
        <p className="section-description">Sélectionnez vos principales qualités professionnelles</p>
        
        <div className="competences-container">
          <div className="competences-grid">
            {qualitesDisponibles.map(qualite => (
              <label key={qualite} className="competence-checkbox">
                <input
                  type="checkbox"
                  checked={formData.qualites?.some(q => q.qualite === qualite) || false}
                  onChange={() => handleQualiteToggle(qualite)}
                />
                <span className="checkmark"></span>
                <span className="competence-text">{qualite}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsSelector;