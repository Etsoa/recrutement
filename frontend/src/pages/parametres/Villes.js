import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParametres, createVille} from "../../api/parametreApi";
import Input, { Select } from "../../components/Input";
import { Button } from "../../components";
import '../../styles/Parametrage.css';

function Villes() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [villes, setVilles] = useState('');
  const [showListeVilles, setShowListeVilles] = useState(false);

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

  const handleVilles = async () => {
    try {
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
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="postes-container">
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>➕ Ajouter une nouvelle ville</h3>
        <Input
          label="Nom de la ville"
          type="text"
          onChange={(e) => setVilles(e.target.value)}
          value={villes}
          placeholder="Ex: Paris, Lyon, Marseille..."
        />
        <Button onClick={handleVilles} variant="primary">
          Ajouter une ville
        </Button>
      </div>

      {/* Section liste des villes */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des villes ({parametrages.villes?.length || 0})</h3>
          <Button
            onClick={() => setShowListeVilles(prev => !prev)}
            variant="secondary"
          >
            {showListeVilles ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeVilles && (
          <div className="list-body">
            {parametrages.villes?.length === 0 ? (
              <div className="empty">
                🏢 Aucune ville configurée
                <p>Ajoutez votre première ville ci-dessus</p>
              </div>
            ) : (
              parametrages.villes?.map((ville) => (
                <div key={ville.id_ville} className="list-item">
                  <div>
                    <h4>{ville.valeur}</h4>
                  </div>
                  <div className="actions">
                    <button className="btn-icon">✏️</button>
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
export default Villes;