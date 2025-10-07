import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createNiveau } from "../../../api/parametreApi";

function Niveau() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [niveau, setNiveau] = useState('');
  const [showListeNiveaux, setShowListeNiveaux] = useState(true);
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

  const handleNiveau = async () => {
    if (!niveau.trim()) {
      alert("Veuillez saisir un niveau");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: niveau
      };
      const response = await createNiveau(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setNiveau('');
      } else {
        alert("Erreur lors de la création du niveau");
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
    setShowListeNiveaux(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Niveaux</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListeNiveaux ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListeNiveaux && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Ajouter un niveau
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Nom du niveau
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                placeholder="Ex: Bac, Licence, Master..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleNiveau}
              disabled={loading || !niveau.trim()}
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
              <h4 className="parametrage-unite__list-title">Niveaux configurés</h4>
              <span className="parametrage-unite__list-count">
                {parametrages.niveaux?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!parametrages.niveaux || parametrages.niveaux.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">🎓</div>
                  <p className="parametrage-unite__empty-text">
                    Aucun niveau configuré.<br/>
                    Ajoutez votre premier niveau.
                  </p>
                </div>
              ) : (
                parametrages.niveaux.map((niveau) => (
                  <div key={niveau.id_niveau} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{niveau.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Niveau d'étude</p>
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
export default Niveau;