import React from 'react';
import { Input, Dropdown } from '../../index';

const PersonalInfoForm = ({ formData, updateFormData, errors = {} }) => {
  const handleChange = (value, fieldName) => {
    // fieldName contient le nom du champ
    updateFormData({ [fieldName]: value });
  };

  const situationsMatrimoniales = [
    { value: 'Célibataire', label: 'Célibataire' },
    { value: 'Marié(e)', label: 'Marié(e)' },
    { value: 'Divorcé(e)', label: 'Divorcé(e)' },
    { value: 'Veuf/Veuve', label: 'Veuf/Veuve' },
    { value: 'Union libre', label: 'Union libre' }
  ];

  const genres = [
    { value: 'Homme', label: 'Homme' },
    { value: 'Femme', label: 'Femme' },
    { value: 'Autre', label: 'Autre' }
  ];

  const villes = [
    { value: 'Antananarivo', label: 'Antananarivo' },
    { value: 'Antsirabe', label: 'Antsirabe' },
    { value: 'Fianarantsoa', label: 'Fianarantsoa' },
    { value: 'Toamasina', label: 'Toamasina' },
    { value: 'Mahajanga', label: 'Mahajanga' },
    { value: 'Toliara', label: 'Toliara' },
    { value: 'Antsiranana', label: 'Antsiranana' },
    { value: 'Morondava', label: 'Morondava' },
    { value: 'Nosy Be', label: 'Nosy Be' },
    { value: 'Manakara', label: 'Manakara' },
    { value: 'Autre', label: 'Autre' }
  ];

  return (
    <div className="section">
      <h3>Identité & Contact</h3>
      <div className="form-grid two-columns">
        <Input
          label="Nom"
          name="nom"
          value={formData.nom || ''}
          onChange={handleChange}
          required={true}
          placeholder="Votre nom de famille"
          error={errors.nom}
        />

        <Input
          label="Prénom"
          name="prenom"
          value={formData.prenom || ''}
          onChange={handleChange}
          required={true}
          placeholder="Votre prénom"
          error={errors.prenom}
        />

        <Dropdown
          label="Genre"
          name="genre"
          value={formData.genre || ''}
          onChange={handleChange}
          required={true}
          options={genres}
          placeholder="Sélectionner"
          error={errors.genre}
        />

        <Input
          label="Date de naissance"
          name="date_naissance"
          type="date"
          value={formData.date_naissance || ''}
          onChange={handleChange}
          required={true}
          error={errors.date_naissance}
        />

        <Dropdown
          label="Situation matrimoniale"
          name="situation_matrimoniale"
          value={formData.situation_matrimoniale || ''}
          onChange={handleChange}
          options={situationsMatrimoniales}
          placeholder="Sélectionner"
          error={errors.situation_matrimoniale}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          required={true}
          placeholder="votre.email@exemple.com"
          error={errors.email}
        />

        <Input
          label="Téléphone"
          name="telephone"
          type="tel"
          value={formData.telephone || ''}
          onChange={handleChange}
          required={true}
          placeholder="0123456789"
          error={errors.telephone}
        />

        <Input
          label="Adresse"
          name="adresse"
          value={formData.adresse || ''}
          onChange={handleChange}
          required={true}
          placeholder="Votre adresse complète"
          error={errors.adresse}
        />

        <Dropdown
          label="Ville"
          name="ville"
          value={formData.ville || ''}
          onChange={handleChange}
          required={true}
          options={villes}
          placeholder="Sélectionner une ville"
          error={errors.ville}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;