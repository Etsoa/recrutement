import React from 'react';
import '../../styles/CandidatureStep.css';

const SummaryStep = ({ formData, annonceData, errors = {} }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
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
        <h2>Récapitulatif de votre candidature</h2>
        <p>Vérifiez toutes vos informations avant d'envoyer votre candidature</p>
      </div>

      <div className="step-content">
        {/* Poste visé */}
        {annonceData && (
          <div className="section summary-section">
            <h3>Poste visé</h3>
            <div className="summary-card">
              <div className="job-summary">
                <h4>{annonceData.intitule_poste}</h4>
                <p><strong>Entreprise :</strong> {annonceData.nom_entreprise}</p>
                <p><strong>Localisation :</strong> {annonceData.ville}</p>
                <p><strong>Type :</strong> {annonceData.type_contrat}</p>
              </div>
            </div>
          </div>
        )}

        {/* Informations personnelles */}
        <div className="section summary-section">
          <h3>Informations personnelles</h3>
          <div className="summary-card">
            <div className="summary-grid">
              <div className="summary-item">
                <strong>Nom complet :</strong>
                <span>{formData.nom} {formData.prenom}</span>
              </div>
              <div className="summary-item">
                <strong>Date de naissance :</strong>
                <span>{formatDate(formData.date_naissance)}</span>
              </div>
              <div className="summary-item">
                <strong>Genre :</strong>
                <span>{formData.genre || 'Non spécifié'}</span>
              </div>
              <div className="summary-item">
                <strong>Email :</strong>
                <span>{formData.email}</span>
              </div>
              <div className="summary-item">
                <strong>Téléphone :</strong>
                <span>{formData.telephone}</span>
              </div>
              <div className="summary-item">
                <strong>Adresse :</strong>
                <span>{formData.adresse}, {formData.ville}</span>
              </div>
              {formData.situation_matrimoniale && (
                <div className="summary-item">
                  <strong>Situation matrimoniale :</strong>
                  <span>{formData.situation_matrimoniale}</span>
                </div>
              )}
              {formData.nombre_enfants && (
                <div className="summary-item">
                  <strong>Nombre d'enfants :</strong>
                  <span>{formData.nombre_enfants}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Formation */}
        <div className="section summary-section">
          <h3>Formation</h3>
          <div className="summary-card">
            <div className="summary-grid">
              <div className="summary-item">
                <strong>Niveau d'études :</strong>
                <span>{formData.niveau}</span>
              </div>
              <div className="summary-item">
                <strong>Filière :</strong>
                <span>{formData.filiere}</span>
              </div>
              {formData.etablissement && (
                <div className="summary-item">
                  <strong>Établissement :</strong>
                  <span>{formData.etablissement}</span>
                </div>
              )}
              {formData.annee_obtention && (
                <div className="summary-item">
                  <strong>Année d'obtention :</strong>
                  <span>{formData.annee_obtention}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expériences */}
        {formData.experiences && formData.experiences.length > 0 && (
          <div className="section summary-section">
            <h3>Expériences professionnelles</h3>
            <div className="summary-card">
              {formData.experiences.map((exp, index) => (
                <div key={index} className="experience-summary">
                  <h4>{exp.poste} - {exp.entreprise}</h4>
                  {(exp.date_debut || exp.date_fin) && (
                    <p className="period">
                      {exp.date_debut ? new Date(exp.date_debut + '-01').toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'}) : '?'} - 
                      {exp.date_fin ? new Date(exp.date_fin + '-01').toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'}) : 'Actuel'}
                    </p>
                  )}
                  {exp.description && <p>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Langues */}
        {formData.langues && formData.langues.length > 0 && (
          <div className="section summary-section">
            <h3>Langues</h3>
            <div className="summary-card">
              <div className="competences-summary">
                {formData.langues.map((langue, index) => (
                  <div key={index} className="competence-tag">
                    <span className="competence-name">{langue.langue}</span>
                    <span className="competence-level">{langue.niveau}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Qualités */}
        {formData.qualites && formData.qualites.length > 0 && (
          <div className="section summary-section">
            <h3>Qualités professionnelles</h3>
            <div className="summary-card">
              <div className="competences-summary">
                {formData.qualites.map((qualite, index) => (
                  <div key={index} className="competence-tag">
                    <span className="competence-name">{qualite.qualite}</span>
                    <span className="competence-level">{qualite.niveau}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Documents */}
        <div className="section summary-section">
          <h3>Documents téléchargés</h3>
          <div className="summary-card">
            <div className="documents-summary">
              {formData.photo ? (
                <div className="document-item">
                  <div className="document-icon">📷</div>
                  <div className="document-info">
                    <strong>Photo de profil</strong>
                    <small>{formData.photo.name} ({formatFileSize(formData.photo.size)})</small>
                  </div>
                  <div className="document-status success">✓</div>
                </div>
              ) : (
                <div className="document-item missing">
                  <div className="document-icon">📷</div>
                  <div className="document-info">
                    <strong>Photo de profil</strong>
                    <small>Pas de photo téléchargée</small>
                  </div>
                  <div className="document-status">-</div>
                </div>
              )}
              
              {formData.cv ? (
                <div className="document-item">
                  <div className="document-icon">📄</div>
                  <div className="document-info">
                    <strong>Curriculum Vitae</strong>
                    <small>{formData.cv.name} ({formatFileSize(formData.cv.size)})</small>
                  </div>
                  <div className="document-status success">✓</div>
                </div>
              ) : (
                <div className="document-item missing">
                  <div className="document-icon">📄</div>
                  <div className="document-info">
                    <strong>Curriculum Vitae</strong>
                    <small>CV requis - Non téléchargé</small>
                  </div>
                  <div className="document-status error">✗</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motivation */}
        {formData.motivation && (
          <div className="section summary-section">
            <h3>Lettre de motivation</h3>
            <div className="summary-card">
              <div className="motivation-text">
                <p>{formData.motivation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Validation finale */}
        <div className="section summary-section">
          <div className="final-validation">
            <div className="validation-item">
              <input 
                type="checkbox" 
                id="confirm-info" 
                required 
              />
              <label htmlFor="confirm-info">
                Je confirme que toutes les informations fournies sont exactes et complètes
              </label>
            </div>
            <div className="validation-item">
              <input 
                type="checkbox" 
                id="accept-terms" 
                required 
              />
              <label htmlFor="accept-terms">
                J'accepte que mes données soient traitées dans le cadre de ce processus de recrutement
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;