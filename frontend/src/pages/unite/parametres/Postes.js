import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPoste, updatePoste, getPostesByIdUnite } from "../../../api/parametreApi";
import Input from "../../../components/Input";
import { Button } from "../../../components";

function Postes() {
  const navigate = useNavigate();
  const savedUnite = JSON.parse(localStorage.getItem("unite"));
  const [unite] = useState(savedUnite);
  const [postes, setPostes] = useState([]);  
  const [posteNom, setPosteNom] = useState("");
  const [showListePostes, setShowListePostes] = useState(true);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Charger les postes de l’unité
  useEffect(() => {
    const fetchData = async () => {
      if (unite?.id_unite) {
        try {
          const response = await getPostesByIdUnite(parseInt(unite.id_unite));
          setPostes(response); // on met directement la liste
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
  }, [unite]);

  // Ajouter ou modifier un poste
  const handlePostes = async () => {
    if (!posteNom.trim()) {
      alert("Veuillez saisir un nom de poste");
      return;
    }

    try {
      setLoading(true);
      const data = {
        valeur: posteNom,
        id_unite: unite.id_unite
      };
      let response;
      if (editId) {
        response = await updatePoste(editId, data);
      } else {
        response = await createPoste(data);
      }
      if (response.success) {
        // recharger la liste après ajout ou modif
        const updatedData = await getPostesByIdUnite(parseInt(unite.id_unite));
        setPostes(updatedData);
        setPosteNom("");
        setEditId(null);
      } else {
        alert("Erreur lors de la création/mise à jour du poste");
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Erreur serveur";
      alert("Erreur serveur : " + msg);
      console.error("Erreur complète Axios:", error.response ? error.response : error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (poste) => {
    setEditId(poste.id_poste);
    setPosteNom(poste.valeur);
  };

  const toggleList = () => {
    setShowListePostes(prev => !prev);
  };

  return (
    <>
      <div className="parametrage-unite__section-header">
        <h3 className="parametrage-unite__section-title">Postes</h3>
        <button 
          className="parametrage-unite__toggle-btn"
          onClick={toggleList}
        >
          {showListePostes ? 'Masquer' : 'Afficher'}
        </button>
      </div>

      {showListePostes && (
        <div className="parametrage-unite__section-content">
          {/* Colonne gauche - Formulaire d'ajout */}
          <div className="parametrage-unite__form-column">
            <h4 className="parametrage-unite__form-title">
              {editId ? "Modifier le poste" : "Ajouter un poste"}
            </h4>
            
            <div className="parametrage-unite__form-group">
              <label className="parametrage-unite__label parametrage-unite__label--required">
                Nom du poste
              </label>
              <input
                type="text"
                className="parametrage-unite__input"
                value={posteNom}
                onChange={(e) => setPosteNom(e.target.value)}
                placeholder="Ex: Développeur Senior, Chef de projet..."
              />
            </div>

            <button 
              className="parametrage-unite__btn parametrage-unite__btn--primary"
              onClick={handlePostes}
              disabled={loading || !posteNom.trim()}
            >
              {loading ? (
                <>
                  <span className="parametrage-unite__spinner"></span>
                  Traitement...
                </>
              ) : editId ? "Mettre à jour" : "Ajouter"}
            </button>

            {editId && (
              <button 
                className="parametrage-unite__btn parametrage-unite__btn--secondary"
                onClick={() => { setEditId(null); setPosteNom(""); }}
                style={{ marginTop: '0.5rem' }}
              >
                Annuler
              </button>
            )}
          </div>

          {/* Colonne droite - Liste */}
          <div className="parametrage-unite__list-column">
            <div className="parametrage-unite__list-header">
              <h4 className="parametrage-unite__list-title">Postes configurés</h4>
              <span className="parametrage-unite__list-count">
                {postes.data?.length || 0}
              </span>
            </div>

            <div className="parametrage-unite__list-body">
              {!postes.data || postes.data.length === 0 ? (
                <div className="parametrage-unite__empty">
                  <div className="parametrage-unite__empty-icon">🏢</div>
                  <p className="parametrage-unite__empty-text">
                    Aucun poste configuré.<br/>
                    Ajoutez votre premier poste.
                  </p>
                </div>
              ) : (
                postes.data.map((poste) => (
                  <div key={poste.id_poste} className="parametrage-unite__list-item">
                    <div className="parametrage-unite__item-content">
                      <h5 className="parametrage-unite__item-title">{poste.valeur}</h5>
                      <p className="parametrage-unite__item-subtitle">Unité: {unite.nom}</p>
                    </div>
                    <div className="parametrage-unite__item-actions">
                      <button 
                        className="parametrage-unite__action-btn"
                        onClick={() => handleEdit(poste)}
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
}

export default Postes;
