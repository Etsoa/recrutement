import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createGenre} from "../../../api/parametreApi";

function Genres() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [genres, setGenres] = useState('');
  const [showListeGenres, setShowListeGenres] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllParametres();
        setparametrages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleGenres = async () => {
    if (!genres.trim()) {
      alert("Veuillez saisir un genre");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: genres
      };
      const response = await createGenre(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setGenres('');
      } else {
        alert("Erreur lors de la création du genre");
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Erreur serveur";
      alert("Erreur serveur : " + msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleList = () => {
    setShowListeGenres(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Genres</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListeGenres ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListeGenres && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Ajouter un genre
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Libellé du genre
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                placeholder="Ex: Masculin, Féminin, Non-binaire..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleGenres}
              disabled={loading || !genres.trim()}
            >
              {loading ? (
                <>
                  <span className="parametrage-unite__spinner"></span>
                  Traitement...
                </>
              ) : "Ajouter"}
            </button>
          </div>

          {/* Colonne droite - Liste */}
          <div className="parametrage-unite__list-column">
            <div className="parametrage-unite__list-header">
              <h4 className="parametrage-unite__list-title">Genres configurés</h4>
              <span className="parametrage-unite__list-count">
                {parametrages.genres?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!parametrages.genres || parametrages.genres.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">👤</div>
                  <p className="parametrage-unite__empty-text">
                    Aucun genre configuré.<br/>
                    Ajoutez votre premier genre.
                  </p>
                </div>
              ) : (
                parametrages.genres.map((genre) => (
                  <div key={genre.id_genre} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{genre.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Genre disponible</p>
                    </div>
                    <div className="parametrage-unite__item-actions">
                      <button 
                        className="parametrage-unite__action-btn"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Genres;
