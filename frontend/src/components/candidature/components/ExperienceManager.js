import React, { useState, useEffect } from 'react';
import { Input, TextareaComponent, Button, Dropdown } from '../../index';
import parametresService from '../../../services/parametresService';

const ExperienceManager = ({ formData, updateFormData, errors = {} }) => {
  const [parametres, setParametres] = useState({
    domaines: []
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
            domaines: parametresService.formatForDropdown(response.data.domaines || [])
          });
        } else {
          console.error('Erreur lors du chargement des paramètres:', response.message);
          setParametres({
            domaines: []
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        setParametres({
          domaines: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadParametres();
  }, []);
  // Gestion des expériences
  const handleExperienceChange = (value, fieldName, index) => {
    const field = fieldName.split('.')[1]; // Extraire le nom du champ après le point
    const experiences = [...(formData.experiences || [])];
    experiences[index] = { ...experiences[index], [field]: value };
    updateFormData({ experiences });
  };

  const addExperience = () => {
    const experiences = [...(formData.experiences || [])];
    experiences.push({
      id_domaine: '',
      date_debut: '',
      date_fin: '',
      description_taches: ''
    });
    updateFormData({ experiences });
  };

  const removeExperience = (index) => {
    const experiences = [...(formData.experiences || [])];
    experiences.splice(index, 1);
    updateFormData({ experiences });
  };

  return (
    <div className="section">
      <div className="section-header">
        <h3>Expériences professionnelles</h3>
        <Button 
          variant="primary"
          size="sm"
          onClick={addExperience}
        >
          + Ajouter une expérience
        </Button>
      </div>

      {formData.experiences && formData.experiences.length > 0 ? (
        <div className="formations-list">
          {formData.experiences.map((experience, index) => (
            <div key={index} className="formation-item">
              <div className="formation-header">
                <h4>Expérience #{index + 1}</h4>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  className="remove-filiere-btn"
                >
                  ×
                </Button>
              </div>
              
              <div className="formation-content">
                <div className="form-grid two-columns">
                  <Dropdown
                    label="Domaine d'expérience"
                    name={`experience.id_domaine`}
                    value={experience.id_domaine || ''}
                    onChange={(value, fieldName) => handleExperienceChange(value, fieldName, index)}
                    options={parametres.domaines || []}
                    placeholder={loading ? "Chargement..." : (parametres.domaines || []).length === 0 ? "Aucun domaine disponible" : "Choisir un domaine"}
                    disabled={loading || (parametres.domaines || []).length === 0}
                    required={true}
                    error={errors[`experience_${index}_id_domaine`]}
                  />

                  <Input
                    label="Date de début"
                    name={`experience.date_debut`}
                    type="date"
                    value={experience.date_debut || ''}
                    onChange={(value, fieldName) => handleExperienceChange(value, fieldName, index)}
                    required={true}
                    error={errors[`experience_${index}_date_debut`]}
                  />

                  <Input
                    label="Date de fin"
                    name={`experience.date_fin`}
                    type="date"
                    value={experience.date_fin || ''}
                    onChange={(value, fieldName) => handleExperienceChange(value, fieldName, index)}
                    error={errors[`experience_${index}_date_fin`]}
                    helperText="Laissez vide si vous y travaillez encore"
                  />

                  <TextareaComponent
                    label="Description de l'expérience"
                    name={`experience.description_taches`}
                    value={experience.description_taches || ''}
                    onChange={(value, fieldName) => handleExperienceChange(value, fieldName, index)}
                    placeholder="Décrivez brièvement votre expérience dans ce domaine..."
                    rows={3}
                    helperText="Optionnel - Ajoutez des détails sur votre expérience"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Aucune expérience ajoutée.</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;