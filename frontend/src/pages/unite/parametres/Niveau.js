import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createNiveau } from "../../../api/parametreApi";
import Input from "../../../components/Input";
import { Button } from "../../../components";
import '../../../styles/Parametrage.css';

function Niveau() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [niveau, setNiveau] = useState('');
  const [showListeNiveaux, setShowListeNiveaux] = useState(false);
  

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
    try {
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
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div style={{width: '50%'}}>
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>➕ Ajouter un nouveau niveau</h3>
        <Input
          label="Nom du niveau"
          type="text"
          onChange={(e) => setNiveau(e.target.value)}
          value={niveau}
          placeholder="Ex: Bac, Licence, Master..."
        />
        <Button onClick={handleNiveau} variant="primary">
          Ajouter un niveau
        </Button>
      </div>

      {/* Section liste des niveaux */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des niveaux ({parametrages.niveaux?.length || 0})</h3>
          <Button
            onClick={() => setShowListeNiveaux(prev => !prev)}
            variant="secondary"
          >
            {showListeNiveaux ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeNiveaux && (
          <div className="list-body">
            {parametrages.niveaux?.length === 0 ? (
              <div className="empty">
                🏢 Aucun niveau configuré
                <p>Ajoutez votre premier niveau ci-dessus</p>
              </div>
            ) : (
              parametrages.niveaux?.map((niveau) => (
                <div key={niveau.id_niveau} className="list-item">
                  <div>
                    <h4>{niveau.valeur}</h4>
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
export default Niveau;