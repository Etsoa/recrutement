import React, { useState, useEffect } from 'react';
import parametresService from '../../../services/parametresService';

const SkillsSelector = ({ formData, updateFormData, errors = {} }) => {
  const [parametres, setParametres] = useState({
    langues: [],
    qualites: []
  });
  const [loading, setLoading] = useState(true);

  // Charger les paramètres au montage du composant
  useEffect(() => {
    const loadParametres = async () => {
      try {
        setLoading(true);
        const response = await parametresService.getAllParametres();
        
        if (response.success && response.data) {
          setParametres({
            langues: parametresService.formatForDropdown(response.data.langues || []),
            qualites: parametresService.formatForDropdown(response.data.qualites || [])
          });
        } else {
          console.error('Erreur lors du chargement des paramètres:', response.message);
          setParametres({
            langues: [],
            qualites: []
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        setParametres({
          langues: [],
          qualites: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadParametres();
  }, []);

  // Gestion des langues (checkbox)
  const handleLangueToggle = (langueValue) => {
    const langues = [...(formData.langues || [])];
    const index = langues.findIndex(l => l.langue === langueValue);
    
    if (index > -1) {
      langues.splice(index, 1);
    } else {
      langues.push({ langue: langueValue });
    }
    updateFormData({ langues });
  };

  // Gestion des qualités (checkbox)
  const handleQualiteToggle = (qualiteValue) => {
    const qualites = [...(formData.qualites || [])];
    const index = qualites.findIndex(q => q.qualite === qualiteValue);
    
    if (index > -1) {
      qualites.splice(index, 1);
    } else {
      qualites.push({ qualite: qualiteValue });
    }
    updateFormData({ qualites });
  };

  return (
    <>
      {/* Section Langues */}
      <div className="section">
        <h3>Langues maîtrisées</h3>
        <p className="section-description">Sélectionnez les langues que vous maîtrisez</p>
        
        {errors.langues && (
          <div className="error-message">
            <p>{errors.langues}</p>
          </div>
        )}
        
        {loading ? (
          <div className="loading-state">
            <p>Chargement des langues disponibles...</p>
          </div>
        ) : parametres.langues.length === 0 ? (
          <div className="empty-state">
            <p>Aucune langue disponible</p>
          </div>
        ) : (
          <div className="competences-container">
            <div className="competences-grid">
              {parametres.langues.map(langue => (
                <label key={langue.value} className="competence-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.langues?.some(l => l.langue === langue.value) || false}
                    onChange={() => handleLangueToggle(langue.value)}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  <span className="competence-text">{langue.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section Qualités */}
      <div className="section">
        <h3>Qualités professionnelles</h3>
        <p className="section-description">Sélectionnez vos principales qualités professionnelles</p>
        
        {errors.qualites && (
          <div className="error-message">
            <p>{errors.qualites}</p>
          </div>
        )}
        
        {loading ? (
          <div className="loading-state">
            <p>Chargement des qualités disponibles...</p>
          </div>
        ) : parametres.qualites.length === 0 ? (
          <div className="empty-state">
            <p>Aucune qualité disponible</p>
          </div>
        ) : (
          <div className="competences-container">
            <div className="competences-grid">
              {parametres.qualites.map(qualite => (
                <label key={qualite.value} className="competence-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.qualites?.some(q => q.qualite === qualite.value) || false}
                    onChange={() => handleQualiteToggle(qualite.value)}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  <span className="competence-text">{qualite.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SkillsSelector;