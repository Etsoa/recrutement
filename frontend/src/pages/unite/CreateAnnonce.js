import { useState, useEffect } from "react";
import { useNavigate } from '../../router/useNavigateHelper';
import { annoncesBackOfficeService, parametresService } from "../../services";
import '../../styles/CreateAnnonceUnite.css';

function CreateAnnonce() {
  const navigate = useNavigate();
  const savedUnite = JSON.parse(localStorage.getItem("unite"));
  const [unite] = useState(savedUnite);
  
  // États
  const [parametrages, setParametrages] = useState([]);
  const [listePostes, setListePostes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Données du formulaire
  const [postes, setPostes] = useState('');
  const [villes, setVilles] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [genre, setGenre] = useState('');
  const [qualites, setQualites] = useState([]);

  // Chargement initial
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await parametresService.getAllParametres();
        setParametrages(response.data);
        const responsePostes = await parametresService.getPostesByIdUnite(parseInt(unite.id_unite));
        setListePostes(responsePostes);
      } catch (error) {
        console.error(error);
        setMessage({ type: 'error', text: 'Erreur lors du chargement des données' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [unite.id_unite]);

  // Gestion des messages
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Soumission du formulaire
  const handleAnnonce = async () => {
    if (!genre || !postes || !villes) {
      showMessage('error', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      const data = {
        age_min: parseInt(ageMin) || 18,
        age_max: parseInt(ageMax) || 65,
        id_poste: parseInt(postes),
        id_ville: parseInt(villes),
        id_genre: parseInt(genre),
        qualites
      };

      const response = await annoncesBackOfficeService.createAnnonce(data);
      if (response.success) {
        showMessage('success', 'Annonce créée avec succès');
      }
    } catch (error) {
      console.error(error);
      showMessage('error', 'Erreur lors de la création de l\'annonce');
    } finally {
      setLoading(false);
    }
  };

  // Gestion des qualités
  const handleQualiteChange = (qualiteId) => {
    if (qualites.includes(qualiteId)) {
      setQualites(qualites.filter(id => id !== qualiteId));
    } else {
      setQualites([...qualites, qualiteId]);
    }
  };

  return (
    <div className="create-annonce-unite">
      <div className="create-annonce-unite__container">
        <div className="create-annonce-unite__header">
          <button 
            className="create-annonce-unite__btn create-annonce-unite__btn--ghost"
            onClick={() => navigate(-1)}
          >
            ← Retour
          </button>
          <div>
            <h1 className="create-annonce-unite__title">Nouvelle Annonce</h1>
            <p className="create-annonce-unite__subtitle">Créer une offre d'emploi</p>
          </div>
        </div>

        <div className="create-annonce-unite__content">
          {message.text && (
            <div className={`create-annonce-unite__message create-annonce-unite__message--${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="create-annonce-unite__section">
            <h2 className="create-annonce-unite__section-title">Informations principales</h2>
            <div className="create-annonce-unite__form-grid">
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">
                  Poste
                </label>
                <select 
                  className="create-annonce-unite__select"
                  value={postes}
                  onChange={(e) => setPostes(e.target.value)}
                >
                  <option value="">Sélectionnez un poste</option>
                  {listePostes.data?.map((poste) => (
                    <option key={poste.id_poste} value={poste.id_poste}>
                      {poste.valeur}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">
                  Ville
                </label>
                <select 
                  className="create-annonce-unite__select"
                  value={villes}
                  onChange={(e) => setVilles(e.target.value)}
                >
                  <option value="">Sélectionnez une ville</option>
                  {parametrages.villes?.map((ville) => (
                    <option key={ville.id_ville} value={ville.id_ville}>
                      {ville.valeur}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">
                  Genre
                </label>
                <select 
                  className="create-annonce-unite__select"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">Sélectionnez un genre</option>
                  {parametrages.genres?.map((g) => (
                    <option key={g.id_genre} value={g.id_genre}>
                      {g.valeur}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Âge minimum</label>
                <input
                  type="number"
                  className="create-annonce-unite__input"
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                  placeholder="18"
                />
              </div>

              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Âge maximum</label>
                <input
                  type="number"
                  className="create-annonce-unite__input"
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                  placeholder="65"
                />
              </div>
            </div>
          </div>

          <div className="create-annonce-unite__section">
            <h2 className="create-annonce-unite__section-title">Qualités requises</h2>
            <div className="create-annonce-unite__checkbox-grid">
              {parametrages.qualites?.map((qualite) => (
                <div key={qualite.id_qualite} className="create-annonce-unite__checkbox-item">
                  <input
                    type="checkbox"
                    id={`qualite-${qualite.id_qualite}`}
                    checked={qualites.includes(qualite.id_qualite)}
                    onChange={() => handleQualiteChange(qualite.id_qualite)}
                  />
                  <label htmlFor={`qualite-${qualite.id_qualite}`}>
                    {qualite.valeur}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="create-annonce-unite__actions">
          <button 
            className="create-annonce-unite__btn create-annonce-unite__btn--secondary"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          <button
            className="create-annonce-unite__btn create-annonce-unite__btn--primary"
            onClick={handleAnnonce}
            disabled={loading || !genre || !postes || !villes}
          >
            {loading ? 'Création...' : 'Créer l\'annonce'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAnnonce;
