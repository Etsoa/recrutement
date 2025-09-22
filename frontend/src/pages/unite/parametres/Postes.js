import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPoste, updatePoste, getPostesByIdUnite } from "../../../api/parametreApi";
import Input from "../../../components/Input";
import { Button } from "../../../components";
import '../../../styles/Parametrage.css';

function Postes() {
  const navigate = useNavigate();
  const savedUnite = JSON.parse(localStorage.getItem("unite"));
  const [unite] = useState(savedUnite);
  const [postes, setPostes] = useState([]);  
  const [posteNom, setPosteNom] = useState("");
  const [showListePostes, setShowListePostes] = useState(false);
  const [editId, setEditId] = useState(null);

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
    try {
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
          const response = await getPostesByIdUnite(parseInt(unite.id_unite));
          setPostes(response); // on met directement la liste
        setPosteNom("");
        setEditId(null);
      } else {
        alert("Erreur lors de la création/mise à jour du poste");
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Erreur serveur";
      alert("Erreur serveur : " + msg);
      console.error("Erreur complète Axios:", error.response ? error.response : error);
    }
  };

  const handleEdit = (poste) => {
    setEditId(poste.id_poste);
    setPosteNom(poste.valeur);
  };

  return (
    <div style={{ width: '50%' }}>
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>{editId ? "✏️ Modifier le poste" : "➕ Ajouter un nouveau poste"}</h3>
        <Input
          label="Nom du poste"
          type="text"
          onChange={(e) => setPosteNom(e.target.value)}
          value={posteNom}
          placeholder="Ex: Développeur Senior, Chef de projet..."
        />

        <Button onClick={handlePostes} variant="primary">
          {editId ? "Mettre à jour" : "Ajouter le poste"}
        </Button>
        {editId && (
          <Button onClick={() => { setEditId(null); setPosteNom(""); }} variant="secondary">
            Annuler
          </Button>
        )}
      </div>

      {/* Section liste des postes */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des postes ({postes.data?.length || 0})</h3>
          <Button
            onClick={() => setShowListePostes(prev => !prev)}
            variant="secondary"
          >
            {showListePostes ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListePostes && (
          <div className="list-body">
            {postes.data?.length === 0 ? (
              <div className="empty">
                🏢 Aucun poste configuré
                <p>Ajoutez votre premier poste ci-dessus</p>
              </div>
            ) : (
              postes.data?.map((poste) => (
                <div key={poste.id_poste} className="list-item">
                  <div>
                    <h4>{poste.valeur}</h4>
                    <p>🏢 {unite.nom}</p>
                  </div>
                  <div className="actions">
                    <button className="btn-icon" onClick={() => handleEdit(poste)}>✏️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Postes;
