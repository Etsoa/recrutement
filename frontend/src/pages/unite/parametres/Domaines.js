import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParametres, createDomaine } from "../../../api/parametreApi";
import Input from "../../../components/Input";
import { Button } from "../../../components";
import '../../../styles/Parametrage.css';

function Domaines() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [domaine, setDomaine] = useState('');
  const [showListeDomaines, setShowListeDomaines] = useState(false);

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
    try {
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
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div style={{width: '50%'}}>
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>➕ Ajouter un nouveau domaine</h3>
        <Input
          label="Nom du domaine"
          type="text"
          onChange={(e) => setDomaine(e.target.value)}
          value={domaine}
          placeholder="Ex: Informatique, Finance, Marketing..."
        />
        <Button onClick={handleDomaine} variant="primary">
          Ajouter un domaine
        </Button>
      </div>

      {/* Section liste des domaines */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des domaines ({parametrages.domaines?.length || 0})</h3>
          <Button
            onClick={() => setShowListeDomaines(prev => !prev)}
            variant="secondary"
          >
            {showListeDomaines ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeDomaines && (
          <div className="list-body">
            {parametrages.domaines?.length === 0 ? (
              <div className="empty">
                🏢 Aucun domaine configuré
                <p>Ajoutez votre premier domaine ci-dessus</p>
              </div>
            ) : (
              parametrages.domaines?.map((domaine) => (
                <div key={domaine.id_domaine} className="list-item">
                  <div>
                    <h4>{domaine.valeur}</h4>
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
export default Domaines;