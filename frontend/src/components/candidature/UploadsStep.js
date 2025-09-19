import React from 'react';
import '../../styles/CandidatureStep.css';

const UploadsStep = ({ formData, updateFormData, errors = {} }) => {
  const handleFileChange = (field, file) => {
    if (file) {
      // Validation des fichiers
      if (field === 'cv' && file.type !== 'application/pdf') {
        alert('Le CV doit être au format PDF');
        return;
      }
      if (field === 'photo' && !file.type.startsWith('image/')) {
        alert('La photo doit être une image (JPG, PNG, etc.)');
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
    <div className="candidature-step">
      <div className="step-header">
        <h2>Documents</h2>
        <p>Téléchargez vos documents nécessaires pour votre candidature</p>
      </div>

      <div className="step-content">
        {/* Photo de profil */}
        <div className="section">
          <h3>Photo de profil</h3>
          <div className="upload-section">
            {!formData.photo ? (
              <div className="upload-area">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={(e) => handleFileChange('photo', e.target.files[0])}
                  className="file-input"
                />
                <label htmlFor="photo-upload" className="upload-label">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <strong>Cliquez pour télécharger une photo</strong>
                    <br />
                    <small>Formats acceptés: JPG, PNG, GIF (Max: 5MB)</small>
                  </div>
                </label>
              </div>
            ) : (
              <div className="file-preview">
                <div className="file-info">
                  <div className="file-icon">📷</div>
                  <div className="file-details">
                    <div className="file-name">{formData.photo.name}</div>
                    <div className="file-size">{formatFileSize(formData.photo.size)}</div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={() => removeFile('photo')}
                  >
                    ✕
                  </button>
                </div>
                {formData.photo && (
                  <div className="image-preview">
                    <img 
                      src={URL.createObjectURL(formData.photo)} 
                      alt="Aperçu de la photo"
                      className="preview-image"
                    />
                  </div>
                )}
              </div>
            )}
            <small className="upload-note">
              Optionnel - Une photo professionnelle peut améliorer votre profil
            </small>
          </div>
        </div>

        {/* CV */}
        <div className="section">
          <h3>Curriculum Vitae <span className="required">*</span></h3>
          <div className="upload-section">
            {!formData.cv ? (
              <div className="upload-area">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf"
                  onChange={(e) => handleFileChange('cv', e.target.files[0])}
                  className={`file-input ${errors.cv ? 'error' : ''}`}
                />
                <label htmlFor="cv-upload" className="upload-label">
                  <div className="upload-icon">📄</div>
                  <div className="upload-text">
                    <strong>Cliquez pour télécharger votre CV</strong>
                    <br />
                    <small>Format requis: PDF uniquement (Max: 5MB)</small>
                  </div>
                </label>
                {errors.cv && <span className="error-message">{errors.cv}</span>}
              </div>
            ) : (
              <div className="file-preview">
                <div className="file-info">
                  <div className="file-icon">📄</div>
                  <div className="file-details">
                    <div className="file-name">{formData.cv.name}</div>
                    <div className="file-size">{formatFileSize(formData.cv.size)}</div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={() => removeFile('cv')}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
            <small className="upload-note">
              Requis - Votre CV au format PDF est obligatoire pour valider votre candidature
            </small>
          </div>
        </div>

        {/* Conseils */}
        <div className="section">
          <div className="tips-section">
            <h4>💡 Conseils pour vos documents :</h4>
            <ul className="tips-list">
              <li><strong>Photo :</strong> Utilisez une photo professionnelle, bien éclairée, sur fond neutre</li>
              <li><strong>CV :</strong> Assurez-vous que votre CV est à jour et bien structuré</li>
              <li><strong>Format :</strong> Utilisez uniquement des fichiers PDF pour le CV (plus professionnel)</li>
              <li><strong>Taille :</strong> Les fichiers ne doivent pas dépasser 5MB</li>
              <li><strong>Nom :</strong> Nommez vos fichiers clairement (ex: CV_NomPrenom.pdf)</li>
            </ul>
          </div>
        </div>

        {/* Aperçu des uploads */}
        {(formData.photo || formData.cv) && (
          <div className="section">
            <h4>Documents téléchargés :</h4>
            <div className="uploaded-summary">
              {formData.photo && (
                <div className="upload-summary-item">
                  <span className="status-icon">✅</span>
                  <span>Photo de profil</span>
                </div>
              )}
              {formData.cv && (
                <div className="upload-summary-item">
                  <span className="status-icon">✅</span>
                  <span>Curriculum Vitae (PDF)</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadsStep;