import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createQualite } from "../../../api/parametreApi";

function Qualites() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [qualite, setQualite] = useState('');
  const [showListeQualites, setShowListeQualites] = useState(true);
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

  const handleQualite = async () => {
    if (!qualite.trim()) {
      alert("Veuillez saisir une qualité");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: qualite
      };
      const response = await createQualite(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setQualite('');
      } else {
        alert("Erreur lors de la création de la qualité");
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
    setShowListeQualites(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Qualités</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListeQualites ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListeQualites && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Ajouter une qualité
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Nom de la qualité
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={qualite}
                onChange={(e) => setQualite(e.target.value)}
                placeholder="Ex: Sérieux, Dynamique, Rigoureux..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleQualite}
              disabled={loading || !qualite.trim()}
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
              <h4 className="parametrage-unite__list-title">Qualités configurées</h4>
              <span className="parametrage-unite__list-count">
                {parametrages.qualites?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!parametrages.qualites || parametrages.qualites.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">⭐</div>
                  <p className="parametrage-unite__empty-text">
                    Aucune qualité configurée.<br/>
                    Ajoutez votre première qualité.
                  </p>
                </div>
              ) : (
                parametrages.qualites.map((qualite) => (
                  <div key={qualite.id_qualite} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{qualite.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Trait de caractère</p>
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
export default Qualites;