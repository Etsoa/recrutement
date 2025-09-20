import React from 'react';
import '../../styles/CandidatureStep.css';

const PersonalInfoStep = ({ formData, updateFormData, errors = {} }) => {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  // Gestion des formations
  const handleAddFiliere = () => {
    const formations = formData.formations || [];
    formations.push({
      filiere: '',
      niveaux: []
    });
    updateFormData({ formations });
  };

  const handleRemoveFiliere = (index) => {
    const formations = [...(formData.formations || [])];
    formations.splice(index, 1);
    updateFormData({ formations });
  };

  const handleFiliereChange = (index, filiere) => {
    const formations = [...(formData.formations || [])];
    formations[index] = { ...formations[index], filiere, niveaux: [] };
    updateFormData({ formations });
  };

  const handleNiveauToggle = (formationIndex, niveau) => {
    const formations = [...(formData.formations || [])];
    const formation = formations[formationIndex];
    
    if (formation.niveaux.includes(niveau)) {
      formation.niveaux = formation.niveaux.filter(n => n !== niveau);
    } else {
      formation.niveaux = [...formation.niveaux, niveau];
    }
    
    updateFormData({ formations });
  };

  const filieres = [
    'Informatique',
    'Gestion', 
    'Commerce',
    'Comptabilité',
    'Marketing',
    'Ressources Humaines',
    'Finance',
    'Droit',
    'Médecine',
    'Ingénierie',
    'Architecture',
    'Agriculture',
    'Autre'
  ];

  const niveauxParFiliere = {
    'Informatique': ['Licence', 'Master', 'Ingénieur', 'Doctorat'],
    'Gestion': ['Licence', 'Master', 'MBA', 'Doctorat'],
    'Commerce': ['Licence', 'Master', 'MBA'],
    'Comptabilité': ['Licence', 'Master', 'Expert-comptable'],
    'Marketing': ['Licence', 'Master', 'MBA'],
    'Ressources Humaines': ['Licence', 'Master', 'MBA'],
    'Finance': ['Licence', 'Master', 'MBA', 'Doctorat'],
    'Droit': ['Licence', 'Master', 'Doctorat'],
    'Médecine': ['Doctorat en médecine', 'Spécialisation'],
    'Ingénierie': ['Licence', 'Ingénieur', 'Master', 'Doctorat'],
    'Architecture': ['Licence', 'Master', 'Architecte DPLG'],
    'Agriculture': ['Licence', 'Ingénieur agronome', 'Master', 'Doctorat'],
    'Autre': ['Licence', 'Master', 'Doctorat']
  };

  return (
    <>
      {/* Section Informations personnelles */}
      <div className="section">
        <h3>Identité & Contact</h3>
          <div className="form-grid two-columns">
            <div className="form-group">
              <label htmlFor="nom">
                Nom <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nom"
                value={formData.nom || ''}
                onChange={(e) => handleChange('nom', e.target.value)}
                className={errors.nom ? 'error' : ''}
                placeholder="Votre nom de famille"
              />
              {errors.nom && <span className="error-message">{errors.nom}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="prenom">
                Prénom <span className="required">*</span>
              </label>
              <input
                type="text"
                id="prenom"
                value={formData.prenom || ''}
                onChange={(e) => handleChange('prenom', e.target.value)}
                className={errors.prenom ? 'error' : ''}
                placeholder="Votre prénom"
              />
              {errors.prenom && <span className="error-message">{errors.prenom}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date_naissance">
                Date de naissance <span className="required">*</span>
              </label>
              <input
                type="date"
                id="date_naissance"
                value={formData.date_naissance || ''}
                onChange={(e) => handleChange('date_naissance', e.target.value)}
                className={errors.date_naissance ? 'error' : ''}
              />
              {errors.date_naissance && <span className="error-message">{errors.date_naissance}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="genre">
                Genre <span className="required">*</span>
              </label>
              <select
                id="genre"
                value={formData.genre || ''}
                onChange={(e) => handleChange('genre', e.target.value)}
                className={errors.genre ? 'error' : ''}
              >
                <option value="">Sélectionner votre genre</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.genre && <span className="error-message">{errors.genre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telephone">
                Téléphone <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="telephone"
                value={formData.telephone || ''}
                onChange={(e) => handleChange('telephone', e.target.value)}
                className={errors.telephone ? 'error' : ''}
                placeholder="034 XX XXX XX"
              />
              {errors.telephone && <span className="error-message">{errors.telephone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="ville">
                Ville <span className="required">*</span>
              </label>
              <select
                id="ville"
                value={formData.ville || ''}
                onChange={(e) => handleChange('ville', e.target.value)}
                className={errors.ville ? 'error' : ''}
              >
                <option value="">Sélectionner votre ville</option>
                <option value="Antananarivo">Antananarivo</option>
                <option value="Toamasina">Toamasina</option>
                <option value="Antsirabe">Antsirabe</option>
                <option value="Fianarantsoa">Fianarantsoa</option>
                <option value="Mahajanga">Mahajanga</option>
                <option value="Toliara">Toliara</option>
                <option value="Antsiranana">Antsiranana</option>
              </select>
              {errors.ville && <span className="error-message">{errors.ville}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="situation_matrimoniale">
                Situation matrimoniale
              </label>
              <select
                id="situation_matrimoniale"
                value={formData.situation_matrimoniale || ''}
                onChange={(e) => handleChange('situation_matrimoniale', e.target.value)}
              >
                <option value="">Sélectionner</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf/Veuve">Veuf/Veuve</option>
              </select>
            </div>
          </div>
          
          <div className="form-grid single-column">
            <div className="form-group">
              <label htmlFor="adresse">
                Adresse complète <span className="required">*</span>
              </label>
              <input
                type="text"
                id="adresse"
                value={formData.adresse || ''}
                onChange={(e) => handleChange('adresse', e.target.value)}
                className={errors.adresse ? 'error' : ''}
                placeholder="Votre adresse complète"
              />
              {errors.adresse && <span className="error-message">{errors.adresse}</span>}
            </div>
          </div>
        </div>

        {/* Section Formation */}
        <div className="section">
          <h3>Formation & Études</h3>
          <p className="section-description">Ajoutez vos filières d'études et sélectionnez vos niveaux</p>
          
          <div className="formations-list">
            {(formData.formations || []).map((formation, index) => (
              <div key={index} className="formation-item">
                <div className="formation-header">
                  <h4>Formation #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveFiliere(index)}
                    className="remove-filiere-btn"
                  >
                    ×
                  </button>
                </div>
                
                <div className="formation-content">
                  <div className="filiere-section">
                    <div className="form-group">
                      <label>Filière d'études</label>
                      <select
                        value={formation.filiere || ''}
                        onChange={(e) => handleFiliereChange(index, e.target.value)}
                        className="filiere-select"
                      >
                        <option value="">Choisir une filière</option>
                        {filieres.map(filiere => (
                          <option key={filiere} value={filiere}>{filiere}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {formation.filiere && (
                    <div className="niveaux-selection">
                      <label className="niveaux-label">Niveaux d'études :</label>
                      <div className="niveaux-checkboxes-inline">
                        {niveauxParFiliere[formation.filiere]?.map(niveau => (
                          <label key={niveau} className="checkbox-label-inline">
                            <input
                              type="checkbox"
                              checked={formation.niveaux.includes(niveau)}
                              onChange={() => handleNiveauToggle(index, niveau)}
                              className="niveau-checkbox"
                            />
                            <span className="checkbox-text">{niveau}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={handleAddFiliere}
            className="add-filiere-btn"
          >
            + Ajouter une filière
          </button>
          
          {errors.formations && <span className="error-message">{errors.formations}</span>}
        </div>
    </>
  );
};

export default PersonalInfoStep;