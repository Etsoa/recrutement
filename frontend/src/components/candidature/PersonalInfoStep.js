import React from 'react';
import '../../styles/CandidatureStep.css';

const PersonalInfoStep = ({ formData, updateFormData, errors = {} }) => {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="candidature-step">
      <div className="step-header">
        <h2>Informations personnelles</h2>
        <p>Renseignez vos informations personnelles de base</p>
      </div>

      <div className="step-content">
        <div className="form-grid">
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
            <label htmlFor="adresse">
              Adresse <span className="required">*</span>
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

          <div className="form-group">
            <label htmlFor="nombre_enfants">
              Nombre d'enfants
            </label>
            <input
              type="number"
              id="nombre_enfants"
              min="0"
              value={formData.nombre_enfants || ''}
              onChange={(e) => handleChange('nombre_enfants', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;