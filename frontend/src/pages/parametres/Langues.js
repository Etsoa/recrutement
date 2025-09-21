import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllParametres, createLangue } from "../../api/parametreApi";
import Input from "../../components/Input";
import { Button } from "../../components";
import '../../styles/Parametrage.css';

function Langues() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [langue, setLangue] = useState('');
  const [showListeLangues, setShowListeLangues] = useState(false);
  

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
    try {
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
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <div style={{width: '50%'}}>
      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h3>➕ Ajouter une nouvelle langue</h3>
        <Input
          label="Nom de la langue"
          type="text"
          onChange={(e) => setLangue(e.target.value)}
          value={langue}
          placeholder="Ex: Français, Anglais, Espagnol..."
        />
        <Button onClick={handleLangue} variant="primary">
          Ajouter une langue
        </Button>
      </div>

      {/* Section liste des langues */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des langues ({parametrages.langues?.length || 0})</h3>
          <Button
            onClick={() => setShowListeLangues(prev => !prev)}
            variant="secondary"
          >
            {showListeLangues ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeLangues && (
          <div className="list-body">
            {parametrages.langues?.length === 0 ? (
              <div className="empty">
                🏢 Aucune langue configurée
                <p>Ajoutez votre première langue ci-dessus</p>
              </div>
            ) : (
              parametrages.langues?.map((langue) => (
                <div key={langue.id_langue} className="list-item">
                  <div>
                    <h4>{langue.valeur}</h4>
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
export default Langues;