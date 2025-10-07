import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createLangue } from "../../../api/parametreApi";

function Langues() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [langue, setLangue] = useState('');
  const [showListeLangues, setShowListeLangues] = useState(true);
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

  const handleLangue = async () => {
    if (!langue.trim()) {
      alert("Veuillez saisir une langue");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: langue
      };
      const response = await createLangue(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setLangue('');
      } else {
        alert("Erreur lors de la création de la langue");
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
    setShowListeLangues(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Langues</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListeLangues ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListeLangues && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              Ajouter une langue
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Nom de la langue
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={langue}
                onChange={(e) => setLangue(e.target.value)}
                placeholder="Ex: Français, Anglais, Espagnol..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handleLangue}
              disabled={loading || !langue.trim()}
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
              <h4 className="parametrage-unite__list-title">Langues configurées</h4>
              <span className="parametrage-unite__list-count">
                {parametrages.langues?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!parametrages.langues || parametrages.langues.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">�</div>
                  <p className="parametrage-unite__empty-text">
                    Aucune langue configurée.<br/>
                    Ajoutez votre première langue.
                  </p>
                </div>
              ) : (
                parametrages.langues.map((langue) => (
                  <div key={langue.id_langue} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{langue.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Langue parlée</p>
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
export default Langues;