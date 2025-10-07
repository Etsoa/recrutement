import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createDomaine } from "../../../api/parametreApi";

function Domaines() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [domaine, setDomaine] = useState('');
  const [showListeDomaines, setShowListeDomaines] = useState(true);
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

  const handleDomaine = async () => {
    if (!domaine.trim()) {
      alert("Veuillez saisir un domaine");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: domaine
      };
      const response = await createDomaine(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setDomaine('');
      } else {
        alert("Erreur lors de la création du domaine");
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
    setShowListeDomaines(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Domaines</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListeDomaines ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListeDomaines && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Ajouter un domaine
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Nom du domaine
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={domaine}
                onChange={(e) => setDomaine(e.target.value)}
                placeholder="Ex: Informatique, Finance, Marketing..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleDomaine}
              disabled={loading || !domaine.trim()}
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
              <h4 className="parametrage-unite__list-title">Domaines configurés</h4>
              <span className="parametrage-unite__list-count">
                {parametrages.domaines?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!parametrages.domaines || parametrages.domaines.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">🏭</div>
                  <p className="parametrage-unite__empty-text">
                    Aucun domaine configuré.<br/>
                    Ajoutez votre premier domaine.
                  </p>
                </div>
              ) : (
                parametrages.domaines.map((domaine) => (
                  <div key={domaine.id_domaine} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{domaine.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Secteur d'activité</p>
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
export default Domaines;