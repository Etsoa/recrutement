import React, { useState, useEffect } from "react";
import { getAllParametres, createVille} from "../../../api/parametreApi";

function Villes() {
  const [parametrages, setparametrages] = useState([]);
  const [villes, setVilles] = useState('');
  const [showListeVilles, setShowListeVilles] = useState(true);
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

  const handleVilles = async () => {
    if (!villes.trim()) {
      alert("Veuillez saisir un nom de ville");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: villes
      };
      const response = await createVille(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setVilles('');
      } else {
        alert("Erreur lors de la création de la ville");
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
    setShowListeVilles(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Villes</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListeVilles ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListeVilles && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Ajouter une ville
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Nom de la ville
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={villes}
                onChange={(e) => setVilles(e.target.value)}
                placeholder="Ex: Paris, Lyon, Marseille..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleVilles}
              disabled={loading || !villes.trim()}
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
              <h4 className="parametrage-unite__list-title">Villes configurées</h4>
              <span className="parametrage-unite__list-count">
                {parametrages.villes?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!parametrages.villes || parametrages.villes.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">🏙️</div>
                  <p className="parametrage-unite__empty-text">
                    Aucune ville configurée.<br/>
                    Ajoutez votre première ville.
                  </p>
                </div>
              ) : (
                parametrages.villes.map((ville) => (
                  <div key={ville.id_ville} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{ville.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Ville disponible</p>
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
export default Villes;