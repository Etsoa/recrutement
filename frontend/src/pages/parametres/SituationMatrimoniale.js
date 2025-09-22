import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParametres, createSituationMatrimoniale } from "../../api/parametreApi";
import Input from "../../components/Input";
import { Button } from "../../components";
import '../../styles/Parametrage.css';

function SituationMatrimoniale() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [situation, setSituation] = useState('');
  const [showListeSituations, setShowListeSituations] = useState(false);

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

  const handleSituation = async () => {
    try {
      const data = {
        valeur: situation
      };
      const response = await createSituationMatrimoniale(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setSituation('');
      } else {
        alert("Erreur lors de la création de la situation matrimoniale");
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
        <h3>➕ Ajouter une nouvelle situation matrimoniale</h3>
        <Input
          label="Situation matrimoniale"
          type="text"
          onChange={(e) => setSituation(e.target.value)}
          value={situation}
          placeholder="Ex: Célibataire, Marié(e), Divorcé(e)..."
        />
        <Button onClick={handleSituation} variant="primary">
          Ajouter une situation
        </Button>
      </div>

      {/* Section liste des situations matrimoniales */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des situations matrimoniales ({parametrages.situationMatrimoniales?.length || 0})</h3>
          <Button
            onClick={() => setShowListeSituations(prev => !prev)}
            variant="secondary"
          >
            {showListeSituations ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeSituations && (
          <div className="list-body">
            {parametrages.situationMatrimoniales?.length === 0 ? (
              <div className="empty">
                🏢 Aucune situation configurée
                <p>Ajoutez votre première situation ci-dessus</p>
              </div>
            ) : (
              parametrages.situationMatrimoniales?.map((situation) => (
                <div key={situation.id_situation_matrimoniale} className="list-item">
                  <div>
                    <h4>{situation.valeur}</h4>
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
export default SituationMatrimoniale;