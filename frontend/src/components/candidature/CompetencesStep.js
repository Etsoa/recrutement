import React from 'react';
import '../../styles/CandidatureStep.css';

const CompetencesStep = ({ formData, updateFormData, errors = {} }) => {
  const handleLangueChange = (index, field, value) => {
    const langues = [...(formData.langues || [])];
    langues[index] = { ...langues[index], [field]: value };
    updateFormData({ langues });
  };

  const addLangue = () => {
    const langues = [...(formData.langues || [])];
    langues.push({
      langue: '',
      niveau: ''
    });
    updateFormData({ langues });
  };

  const removeLangue = (index) => {
    const langues = [...(formData.langues || [])];
    langues.splice(index, 1);
    updateFormData({ langues });
  };

  const handleQualiteChange = (index, field, value) => {
    const qualites = [...(formData.qualites || [])];
    qualites[index] = { ...qualites[index], [field]: value };
    updateFormData({ qualites });
  };

  const addQualite = () => {
    const qualites = [...(formData.qualites || [])];
    qualites.push({
      qualite: '',
      niveau: ''
    });
    updateFormData({ qualites });
  };

  const removeQualite = (index) => {
    const qualites = [...(formData.qualites || [])];
    qualites.splice(index, 1);
    updateFormData({ qualites });
  };

  return (
    <div className="candidature-step">
      <div className="step-header">
        <h2>Compétences & Langues</h2>
        <p>Indiquez vos compétences linguistiques et qualités professionnelles</p>
      </div>

      <div className="step-content">
        {/* Langues Section */}
        <div className="section">
          <div className="section-header">
            <h3>Langues maîtrisées</h3>
            <button 
              type="button" 
              className="btn-add"
              onClick={addLangue}
            >
              + Ajouter une langue
            </button>
          </div>

          {formData.langues && formData.langues.length > 0 ? (
            <div className="competences-list">
              {formData.langues.map((langue, index) => (
                <div key={index} className="competence-item">
                  <div className="competence-header">
                    <h4>Langue {index + 1}</h4>
                    <button 
                      type="button"
                      className="btn-remove"
                      onClick={() => removeLangue(index)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="form-grid competence-grid">
                    <div className="form-group">
                      <label>Langue <span className="required">*</span></label>
                      <select
                        value={langue.langue || ''}
                        onChange={(e) => handleLangueChange(index, 'langue', e.target.value)}
                      >
                        <option value="">Sélectionner une langue</option>
                        <option value="Malagasy">Malagasy</option>
                        <option value="Français">Français</option>
                        <option value="Anglais">Anglais</option>
                        <option value="Allemand">Allemand</option>
                        <option value="Espagnol">Espagnol</option>
                        <option value="Italien">Italien</option>
                        <option value="Portugais">Portugais</option>
                        <option value="Chinois">Chinois</option>
                        <option value="Japonais">Japonais</option>
                        <option value="Arabe">Arabe</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Niveau <span className="required">*</span></label>
                      <select
                        value={langue.niveau || ''}
                        onChange={(e) => handleLangueChange(index, 'niveau', e.target.value)}
                      >
                        <option value="">Sélectionner le niveau</option>
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                        <option value="Courant">Courant</option>
                        <option value="Natif">Natif</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Aucune langue ajoutée pour le moment.</p>
              <p>Cliquez sur "Ajouter une langue" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Qualités Section */}
        <div className="section">
          <div className="section-header">
            <h3>Qualités professionnelles</h3>
            <button 
              type="button" 
              className="btn-add"
              onClick={addQualite}
            >
              + Ajouter une qualité
            </button>
          </div>

          {formData.qualites && formData.qualites.length > 0 ? (
            <div className="competences-list">
              {formData.qualites.map((qualite, index) => (
                <div key={index} className="competence-item">
                  <div className="competence-header">
                    <h4>Qualité {index + 1}</h4>
                    <button 
                      type="button"
                      className="btn-remove"
                      onClick={() => removeQualite(index)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="form-grid competence-grid">
                    <div className="form-group">
                      <label>Qualité <span className="required">*</span></label>
                      <select
                        value={qualite.qualite || ''}
                        onChange={(e) => handleQualiteChange(index, 'qualite', e.target.value)}
                      >
                        <option value="">Sélectionner une qualité</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Communication">Communication</option>
                        <option value="Travail en équipe">Travail en équipe</option>
                        <option value="Autonomie">Autonomie</option>
                        <option value="Créativité">Créativité</option>
                        <option value="Organisation">Organisation</option>
                        <option value="Rigueur">Rigueur</option>
                        <option value="Adaptabilité">Adaptabilité</option>
                        <option value="Initiative">Initiative</option>
                        <option value="Gestion du stress">Gestion du stress</option>
                        <option value="Négociation">Négociation</option>
                        <option value="Résolution de problèmes">Résolution de problèmes</option>
                        <option value="Gestion du temps">Gestion du temps</option>
                        <option value="Esprit analytique">Esprit analytique</option>
                        <option value="Persévérance">Persévérance</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Niveau <span className="required">*</span></label>
                      <select
                        value={qualite.niveau || ''}
                        onChange={(e) => handleQualiteChange(index, 'niveau', e.target.value)}
                      >
                        <option value="">Évaluer votre niveau</option>
                        <option value="En développement">En développement</option>
                        <option value="Bon">Bon</option>
                        <option value="Très bon">Très bon</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Aucune qualité ajoutée pour le moment.</p>
              <p>Cliquez sur "Ajouter une qualité" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Informations additionnelles */}
        <div className="section">
          <h3>Informations complémentaires</h3>
          <div className="form-group full-width">
            <label htmlFor="motivation">
              Lettre de motivation
            </label>
            <textarea
              id="motivation"
              value={formData.motivation || ''}
              onChange={(e) => updateFormData({ motivation: e.target.value })}
              placeholder="Expliquez pourquoi vous souhaitez rejoindre notre équipe et ce que vous pouvez nous apporter..."
              rows={6}
            />
            <small>Optionnel - Cette information peut être ajoutée dans votre CV</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetencesStep;