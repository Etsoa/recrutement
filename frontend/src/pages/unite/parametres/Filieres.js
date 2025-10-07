import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createFiliere } from "../../../api/parametreApi";

function Filieres() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [filiere, setFiliere] = useState('');
  const [showListeFilieres, setShowListeFilieres] = useState(true);
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

  const handleFiliere = async () => {
    if (!filiere.trim()) {
      alert("Veuillez saisir une filière");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: filiere
      };
      const response = await createFiliere(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setFiliere('');
      } else {
        alert("Erreur lors de la création de la filière");
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
    setShowListeFilieres(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Filières</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListeFilieres ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListeFilieres && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Ajouter une filière
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Nom de la filière
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={filiere}
                onChange={(e) => setFiliere(e.target.value)}
                placeholder="Ex: Informatique, Gestion, Droit..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleFiliere}
              disabled={loading || !filiere.trim()}
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
              <h4 className="parametrage-unite__list-title">Filières configurées</h4>
              <span className="parametrage-unite__list-count">
                {parametrages.filieres?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!parametrages.filieres || parametrages.filieres.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">📚</div>
                  <p className="parametrage-unite__empty-text">
                    Aucune filière configurée.<br/>
                    Ajoutez votre première filière.
                  </p>
                </div>
              ) : (
                parametrages.filieres.map((filiere) => (
                  <div key={filiere.id_filiere} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{filiere.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Domaine d'étude</p>
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
export default Filieres;