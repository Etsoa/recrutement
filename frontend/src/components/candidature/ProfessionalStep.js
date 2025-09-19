import React from 'react';
import '../../styles/CandidatureStep.css';

const ProfessionalStep = ({ formData, updateFormData, errors = {} }) => {
  const handleExperienceChange = (index, field, value) => {
    const experiences = [...(formData.experiences || [])];
    experiences[index] = { ...experiences[index], [field]: value };
    updateFormData({ experiences });
  };

  const addExperience = () => {
    const experiences = [...(formData.experiences || [])];
    experiences.push({
      poste: '',
      entreprise: '',
      date_debut: '',
      date_fin: '',
      description: ''
    });
    updateFormData({ experiences });
  };

  const removeExperience = (index) => {
    const experiences = [...(formData.experiences || [])];
    experiences.splice(index, 1);
    updateFormData({ experiences });
  };

  const handleFormationChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="candidature-step">
      <div className="step-header">
        <h2>Expériences & Formation</h2>
        <p>Décrivez votre parcours professionnel et votre niveau d'études</p>
      </div>

      <div className="step-content">
        {/* Formation Section */}
        <div className="section">
          <h3>Formation</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="niveau">
                Niveau d'études <span className="required">*</span>
              </label>
              <select
                id="niveau"
                value={formData.niveau || ''}
                onChange={(e) => handleFormationChange('niveau', e.target.value)}
                className={errors.niveau ? 'error' : ''}
              >
                <option value="">Sélectionner votre niveau</option>
                <option value="CEPE">CEPE</option>
                <option value="BEPC">BEPC</option>
                <option value="Baccalauréat">Baccalauréat</option>
                <option value="Licence">Licence</option>
                <option value="Master">Master</option>
                <option value="Doctorat">Doctorat</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.niveau && <span className="error-message">{errors.niveau}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="filiere">
                Filière d'études <span className="required">*</span>
              </label>
              <select
                id="filiere"
                value={formData.filiere || ''}
                onChange={(e) => handleFormationChange('filiere', e.target.value)}
                className={errors.filiere ? 'error' : ''}
              >
                <option value="">Sélectionner votre filière</option>
                <option value="Informatique">Informatique</option>
                <option value="Gestion">Gestion</option>
                <option value="Commerce">Commerce</option>
                <option value="Comptabilité">Comptabilité</option>
                <option value="Marketing">Marketing</option>
                <option value="Ressources Humaines">Ressources Humaines</option>
                <option value="Finance">Finance</option>
                <option value="Droit">Droit</option>
                <option value="Médecine">Médecine</option>
                <option value="Ingénierie">Ingénierie</option>
                <option value="Architecture">Architecture</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.filiere && <span className="error-message">{errors.filiere}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="etablissement">
                Établissement / Université
              </label>
              <input
                type="text"
                id="etablissement"
                value={formData.etablissement || ''}
                onChange={(e) => handleFormationChange('etablissement', e.target.value)}
                placeholder="Nom de votre établissement"
              />
            </div>

            <div className="form-group">
              <label htmlFor="annee_obtention">
                Année d'obtention
              </label>
              <input
                type="number"
                id="annee_obtention"
                min="1990"
                max="2030"
                value={formData.annee_obtention || ''}
                onChange={(e) => handleFormationChange('annee_obtention', e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>
        </div>

        {/* Experiences Section */}
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
            <div className="experiences-list">
              {formData.experiences.map((experience, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h4>Expérience {index + 1}</h4>
                    <button 
                      type="button"
                      className="btn-remove"
                      onClick={() => removeExperience(index)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Poste occupé <span className="required">*</span></label>
                      <input
                        type="text"
                        value={experience.poste || ''}
                        onChange={(e) => handleExperienceChange(index, 'poste', e.target.value)}
                        placeholder="Ex: Développeur web"
                      />
                    </div>

                    <div className="form-group">
                      <label>Entreprise <span className="required">*</span></label>
                      <input
                        type="text"
                        value={experience.entreprise || ''}
                        onChange={(e) => handleExperienceChange(index, 'entreprise', e.target.value)}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>

                    <div className="form-group">
                      <label>Date de début</label>
                      <input
                        type="month"
                        value={experience.date_debut || ''}
                        onChange={(e) => handleExperienceChange(index, 'date_debut', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Date de fin</label>
                      <input
                        type="month"
                        value={experience.date_fin || ''}
                        onChange={(e) => handleExperienceChange(index, 'date_fin', e.target.value)}
                      />
                      <small>Laissez vide si c'est votre poste actuel</small>
                    </div>

                    <div className="form-group full-width">
                      <label>Description des missions</label>
                      <textarea
                        value={experience.description || ''}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        placeholder="Décrivez vos principales missions et réalisations..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Aucune expérience ajoutée pour le moment.</p>
              <p>Cliquez sur "Ajouter une expérience" pour commencer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStep;