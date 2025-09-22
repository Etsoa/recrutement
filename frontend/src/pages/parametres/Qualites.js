import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParametres, createQualite } from "../../api/parametreApi";
import Input from "../../components/Input";
import { Button } from "../../components";
import '../../styles/Parametrage.css';

function Qualites() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [qualite, setQualite] = useState('');
  const [showListeQualites, setShowListeQualites] = useState(false);

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

  const handleQualite = async () => {
    try {
      const data = {
        valeur: qualite
      };
      const response = await createQualite(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setQualite('');
      } else {
        alert("Erreur lors de la création de la qualité");
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
        <h3>➕ Ajouter une nouvelle qualité</h3>
        <Input
          label="Nom de la qualité"
          type="text"
          onChange={(e) => setQualite(e.target.value)}
          value={qualite}
          placeholder="Ex: Sérieux, Dynamique, Rigoureux..."
        />
        <Button onClick={handleQualite} variant="primary">
          Ajouter une qualité
        </Button>
      </div>

      {/* Section liste des qualités */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des qualités ({parametrages.qualites?.length || 0})</h3>
          <Button
            onClick={() => setShowListeQualites(prev => !prev)}
            variant="secondary"
          >
            {showListeQualites ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeQualites && (
          <div className="list-body">
            {parametrages.qualites?.length === 0 ? (
              <div className="empty">
                🏢 Aucune qualité configurée
                <p>Ajoutez votre première qualité ci-dessus</p>
              </div>
            ) : (
              parametrages.qualites?.map((qualite) => (
                <div key={qualite.id_qualite} className="list-item">
                  <div>
                    <h4>{qualite.valeur}</h4>
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
export default Qualites;