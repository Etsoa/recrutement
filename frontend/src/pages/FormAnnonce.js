import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import '../styles/FormAnnonce.css';
import rhService from '../services/rhService';

const FormAnnonce = () => {
  const [formData, setFormData] = useState({
    id_poste: '',
    id_ville: '',
    age_min: '',
    age_max: '',
    id_genre: ''
  });
  
  const [options, setOptions] = useState({
    postes: [],
    villes: [],
    genres: []
  });
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const data = await rhService.getFormAnnonceData();
        if (data.success) {
          setOptions(data.data);
        }
      } catch (err) {
        setMessage('Erreur de chargement des données');
        setMessageType('error');
      }
    };
    fetchFormData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await rhService.createAnnonce(formData);
      if (data.success) {
        setMessage('Annonce créée avec succès');
        setMessageType('success');
        setFormData({
          id_poste: '',
          id_ville: '',
          age_min: '',
          age_max: '',
          id_genre: ''
        });
      } else {
        setMessage(data.message || 'Erreur lors de la création');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Erreur serveur');
      setMessageType('error');
    }
  };

  return (
    <div className="form-annonce">
      <div className="form-annonce__container">
        <div className="form-annonce__header">
          <h1 className="form-annonce__title">Créer une annonce</h1>
          <p className="form-annonce__subtitle">Remplissez les informations pour l'annonce</p>
        </div>

        <form className="form-annonce__form" onSubmit={handleSubmit}>
          <div className="form-annonce__form-group">
            <label>Poste</label>
            <select
              value={formData.id_poste}
              onChange={(e) => setFormData({...formData, id_poste: e.target.value})}
              required
            >
              <option value="">Sélectionnez un poste</option>
              {options.postes.map(poste => (
                <option key={poste.id_poste} value={poste.id_poste}>
                  {poste.valeur}
                </option>
              ))}
            </select>
          </div>

          <div className="form-annonce__form-group">
            <label>Ville</label>
            <select
              value={formData.id_ville}
              onChange={(e) => setFormData({...formData, id_ville: e.target.value})}
              required
            >
              <option value="">Sélectionnez une ville</option>
              {options.villes.map(ville => (
                <option key={ville.id_ville} value={ville.id_ville}>
                  {ville.valeur}
                </option>
              ))}
            </select>
          </div>

          <div className="form-annonce__form-row">
            <div className="form-annonce__form-group">
              <label>Âge minimum</label>
              <input
                type="number"
                value={formData.age_min}
                onChange={(e) => setFormData({...formData, age_min: e.target.value})}
                min="18"
                required
              />
            </div>

            <div className="form-annonce__form-group">
              <label>Âge maximum</label>
              <input
                type="number"
                value={formData.age_max}
                onChange={(e) => setFormData({...formData, age_max: e.target.value})}
                min="18"
                required
              />
            </div>
          </div>

          <div className="form-annonce__form-group">
            <label>Genre</label>
            <select
                value={formData.id_genre}
                onChange={(e) => setFormData({...formData, id_genre: e.target.value})}
                required
            >
              <option value="">Sélectionnez un genre</option>
                {options.genres.map(genre => (
                <option key={genre.id_genre} value={genre.id_genre}>
                    {genre.valeur}
                </option>
                ))}
            </select>
          </div>

            <div className="form-annonce__actions">
                <Button 
                    type="submit"
                >
                    Créer l'annonce
                </Button>
            </div>
        </form>

        {message && (
          <div className={`form-annonce__message form-annonce__message--${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAnnonce;
