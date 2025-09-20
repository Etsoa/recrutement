import React from 'react';
import '../../styles/CandidatureStep.css';

const ProfessionalInfoStep = ({ formData, updateFormData, errors = {} }) => {
  // Gestion des expériences
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

  // Gestion des fichiers
  const handleFileChange = (field, file) => {
    if (file) {
      // Vérification du type de fichier
      const allowedTypes = field === 'photo' ? ['image/jpeg', 'image/png', 'image/gif'] : ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert(field === 'photo' ? 'Veuillez sélectionner une image (JPEG, PNG ou GIF)' : 'Veuillez sélectionner un fichier PDF ou une image');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        alert('Le fichier ne doit pas dépasser 5MB');
        return;
      }
      
      updateFormData({ [field]: file });
    }
  };

  const removeFile = (field) => {
    updateFormData({ [field]: null });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {/* Section Expériences */}
      <div className="section">
        <div className="section-header">
          <h3>Expériences professionnelles</h3>
          <button 
            type="button" 
            className="add-filiere-btn"
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
                
                <div className="form-grid cols-2">
                  <div className="form-group">
                    <label>Poste occupé <span className="required">*</span></label>
                    <input
                      type="text"
                      value={experience.poste || ''}
                      onChange={(e) => handleExperienceChange(index, 'poste', e.target.value)}
                      placeholder="Ex: Développeur Web"
                    />
                  </div>

                  <div className="form-group">
                    <label>Entreprise <span className="required">*</span></label>
                    <input
                      type="text"
                      value={experience.entreprise || ''}
                      onChange={(e) => handleExperienceChange(index, 'entreprise', e.target.value)}
                      placeholder="Ex: TechCorp"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de début <span className="required">*</span></label>
                    <input
                      type="date"
                      value={experience.date_debut || ''}
                      onChange={(e) => handleExperienceChange(index, 'date_debut', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de fin</label>
                    <input
                      type="date"
                      value={experience.date_fin || ''}
                      onChange={(e) => handleExperienceChange(index, 'date_fin', e.target.value)}
                    />
                    <small>Laisser vide si vous occupez toujours ce poste</small>
                  </div>

                  <div className="form-group full-width">
                    <label>Raisons du départ / Réalisations</label>
                    <textarea
                      value={experience.description || ''}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      placeholder="Expliquez brièvement les raisons de votre départ ou vos principales réalisations dans ce poste..."
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

      {/* Section Langues */}
      <div className="section">
        <h3>Langues maîtrisées</h3>
        <p className="section-description">Sélectionnez les langues que vous maîtrisez</p>
        
        <div className="niveaux-checkboxes-inline">
          {languesDisponibles.map(langue => (
            <label key={langue} className="checkbox-label-inline">
              <input
                type="checkbox"
                checked={formData.langues?.some(l => l.langue === langue) || false}
                onChange={() => handleLangueToggle(langue)}
                className="niveau-checkbox"
              />
              <span className="checkbox-text">{langue}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section Qualités */}
      <div className="section">
        <h3>Qualités professionnelles</h3>
        <p className="section-description">Sélectionnez vos principales qualités professionnelles</p>
        
        <div className="niveaux-checkboxes-inline">
          {qualitesDisponibles.map(qualite => (
            <label key={qualite} className="checkbox-label-inline">
              <input
                type="checkbox"
                checked={formData.qualites?.some(q => q.qualite === qualite) || false}
                onChange={() => handleQualiteToggle(qualite)}
                className="niveau-checkbox"
              />
              <span className="checkbox-text">{qualite}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section Documents */}
      <div className="section">
        <h3>Documents requis</h3>
        
        <div className="form-grid cols-2">
          {/* Photo de profil */}
          <div className="upload-section">
            <h4>Photo de profil</h4>
            <div className="upload-area">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => handleFileChange('photo', e.target.files[0])}
                style={{ display: 'none' }}
              />
              <label htmlFor="photo" className="upload-label">
                {formData.photo ? (
                  <div className="file-info">
                    <span>📷 {formData.photo.name}</span>
                    <small>{formatFileSize(formData.photo.size)}</small>
                    <button 
                      type="button" 
                      className="remove-file" 
                      onClick={(e) => {
                        e.preventDefault();
                        removeFile('photo');
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span>📷 Cliquez pour ajouter une photo</span>
                    <small>Formats acceptés: JPG, PNG, GIF (max 5MB)</small>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* CV */}
          <div className="upload-section">
            <h4>Curriculum Vitae (CV) <span className="required">*</span></h4>
            <div className="upload-area">
              <input
                type="file"
                id="cv"
                accept=".pdf,image/*"
                onChange={(e) => handleFileChange('cv', e.target.files[0])}
                style={{ display: 'none' }}
              />
              <label htmlFor="cv" className="upload-label">
                {formData.cv ? (
                  <div className="file-info">
                    <span>📄 {formData.cv.name}</span>
                    <small>{formatFileSize(formData.cv.size)}</small>
                    <button 
                      type="button" 
                      className="remove-file" 
                      onClick={(e) => {
                        e.preventDefault();
                        removeFile('cv');
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span>📄 Cliquez pour ajouter votre CV</span>
                    <small>Formats acceptés: PDF, JPG, PNG (max 5MB)</small>
                  </div>
                )}
              </label>
              {errors.cv && <div className="error-message">{errors.cv}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalInfoStep;