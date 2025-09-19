import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParametres, createFiliere } from "../../api/parametreApi";
import Input from "../../components/Input";
import { Button } from "../../components";
import '../../styles/Parametrage.css';

function Filieres() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [filiere, setFiliere] = useState('');
  const [showListeFilieres, setShowListeFilieres] = useState(false);

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
    try {
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
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div style={{width: '50%'}}>
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>➕ Ajouter une nouvelle filière</h3>
        <Input
          label="Nom de la filière"
          type="text"
          onChange={(e) => setFiliere(e.target.value)}
          value={filiere}
          placeholder="Ex: Informatique, Gestion, Droit..."
        />
        <Button onClick={handleFiliere} variant="primary">
          Ajouter une filière
        </Button>
      </div>

      {/* Section liste des filières */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des filières ({parametrages.filieres?.length || 0})</h3>
          <Button
            onClick={() => setShowListeFilieres(prev => !prev)}
            variant="secondary"
          >
            {showListeFilieres ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeFilieres && (
          <div className="list-body">
            {parametrages.filieres?.length === 0 ? (
              <div className="empty">
                🏢 Aucune filière configurée
                <p>Ajoutez votre première filière ci-dessus</p>
              </div>
            ) : (
              parametrages.filieres?.map((filiere) => (
                <div key={filiere.id_filiere} className="list-item">
                  <div>
                    <h4>{filiere.valeur}</h4>
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
export default Filieres;