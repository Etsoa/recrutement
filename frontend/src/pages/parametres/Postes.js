import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParametres, createPoste, updatePoste } from "../../api/parametreApi";
import Input, { Select } from "../../components/Input";
import { Button } from "../../components";
import '../../styles/Parametrage.css';

function Postes() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [postes, setPostes] = useState('');
  const [postesUnite, setPostesUnite] = useState('');
  const [showListePostes, setShowListePostes] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllParametres();
        // console.log(response.data);
        setparametrages(response.data); // tableau data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePostes = async () => {
    try {
      const data = {
        valeur: postes,
        id_unite: postesUnite
      };
      let response;
      if (editId) {
        response = await updatePoste(editId, data);
      } else {
        response = await createPoste(data);
      }
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setPostes('');
        setPostesUnite('');
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
    setPostes(poste.valeur);
    setPostesUnite(poste.id_unite);
  };

  const getUniteName = (id_unite) => {
    return parametrages.unites?.find(unite => unite.id_unite === id_unite)?.nom || 'Unité inconnue';
  };
  return (
    <div style={{width: '50%'}}>
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>{editId ? "✏️ Modifier le poste" : "➕ Ajouter un nouveau poste"}</h3>
        <Input
          label="Nom du poste"
          type="text"
          onChange={(e) => setPostes(e.target.value)}
          value={postes}
          placeholder="Ex: Développeur Senior, Chef de projet..."
        />

        <Select
          label="Unité d'affectation"
          options={parametrages.unites?.map((unite) => ({
            value: unite.id_unite,
            label: unite.nom
          }))}
          value={postesUnite}
          onChange={(e) => setPostesUnite(e.target.value)}
          name="unite"
        />

        <Button onClick={handlePostes} variant="primary">
          {editId ? "Mettre à jour" : "Ajouter le poste"}
        </Button>
        {editId && (
          <Button onClick={() => { setEditId(null); setPostes(''); setPostesUnite(''); }} variant="secondary">
            Annuler
          </Button>
        )}
      </div>

      {/* Section liste des postes */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des postes ({parametrages.postes?.length || 0})</h3>
          <Button
            onClick={() => setShowListePostes(prev => !prev)}
            variant="secondary"
          >
            {showListePostes ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListePostes && (
          <div className="list-body">
            {parametrages.postes?.length === 0 ? (
              <div className="empty">
                🏢 Aucun poste configuré
                <p>Ajoutez votre premier poste ci-dessus</p>
              </div>
            ) : (
              parametrages.postes?.map((poste) => (
                <div key={poste.id_poste} className="list-item">
                  <div>
                    <h4>{poste.valeur}</h4>
                    <p>🏢 {getUniteName(poste.id_unite)}</p>
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
};
export default Postes;
