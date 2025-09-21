import React, { useState, useEffect } from 'react';
import { Input, Dropdown } from '../../index';
import parametresService from '../../../services/parametresService';

const PersonalInfoForm = ({ formData, updateFormData, errors = {} }) => {
  const [parametres, setParametres] = useState({
    genres: [],
    situationsMatrimoniales: [],
    villes: []
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
            genres: parametresService.formatForDropdown(response.data.genres),
            situationsMatrimoniales: parametresService.formatForDropdown(response.data.situationMatrimoniales),
            villes: parametresService.formatForDropdown(response.data.villes)
          });
        } else {
          console.error('Erreur lors du chargement des paramètres:', response.message);
          // Aucun fallback - utiliser uniquement les données du backend
          setParametres({
            genres: [],
            situationsMatrimoniales: [],
            villes: []
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        // En cas d'erreur réseau, laisser vides les options
        setParametres({
          genres: [],
          situationsMatrimoniales: [],
          villes: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadParametres();
  }, []);

  const handleChange = (value, fieldName) => {
    updateFormData({ [fieldName]: value });
  };

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
          options={parametres.genres}
          placeholder={loading ? "Chargement..." : parametres.genres.length === 0 ? "Aucune option disponible" : "Sélectionner"}
          error={errors.genre}
          disabled={loading || parametres.genres.length === 0}
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

        <Input
          label="Numéro CIN"
          name="cin"
          value={formData.cin || ''}
          onChange={handleChange}
          required={true}
          placeholder="123456789012"
          error={errors.cin}
          maxLength="12"
        />

        <Dropdown
          label="Situation matrimoniale"
          name="situation_matrimoniale"
          value={formData.situation_matrimoniale || ''}
          onChange={handleChange}
          options={parametres.situationsMatrimoniales}
          placeholder={loading ? "Chargement..." : parametres.situationsMatrimoniales.length === 0 ? "Aucune option disponible" : "Sélectionner"}
          error={errors.situation_matrimoniale}
          disabled={loading || parametres.situationsMatrimoniales.length === 0}
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
          options={parametres.villes}
          placeholder={loading ? "Chargement..." : parametres.villes.length === 0 ? "Aucune option disponible" : "Sélectionner une ville"}
          error={errors.ville}
          disabled={loading || parametres.villes.length === 0}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;