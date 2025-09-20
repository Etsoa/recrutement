import React from 'react';
import { Input, TextareaComponent } from '../../index';

const ExperienceManager = ({ formData, updateFormData, errors = {} }) => {
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
      intitule_poste: '',
      nom_entreprise: '',
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
        <button 
          type="button" 
          className="btn-add"
          onClick={addExperience}
        >
          + Ajouter une expérience
        </button>
      </div>

      {formData.experiences && formData.experiences.length > 0 ? (
        <div className="formations-list">
          {formData.experiences.map((experience, index) => (
            <div key={index} className="formation-item">
              <div className="formation-header">
                <h4>Expérience #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="remove-filiere-btn"
                >
                  ×
                </button>
              </div>
              
              <div className="formation-content">
                <div className="form-grid two-columns">
                  <Input
                    label="Intitulé du poste"
                    name={`experience.intitule_poste`}
                    value={experience.intitule_poste || ''}
                    onChange={(value, fieldName) => handleExperienceChange(value, fieldName, index)}
                    required={true}
                    placeholder="Ex: Développeur Web"
                    error={errors[`experience_${index}_intitule_poste`]}
                  />

                  <Input
                    label="Nom de l'entreprise"
                    name={`experience.nom_entreprise`}
                    value={experience.nom_entreprise || ''}
                    onChange={(value, fieldName) => handleExperienceChange(value, fieldName, index)}
                    required={true}
                    placeholder="Ex: TechCorp"
                    error={errors[`experience_${index}_nom_entreprise`]}
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
                    label="Raisons du départ / Réalisations"
                    name={`experience.description_taches`}
                    value={experience.description_taches || ''}
                    onChange={(value, fieldName) => handleExperienceChange(value, fieldName, index)}
                    placeholder="Décrivez vos principales réalisations ou les raisons de votre départ..."
                    rows={3}
                    helperText="Optionnel - Ajoutez des détails sur vos accomplissements ou motivations"
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