import React, { useState, useEffect } from "react";
import { useNavigate } from '../../../router/useNavigateHelper';
import { getAllParametres, createPoste , createGenre} from "../../../api/parametreApi";
import Input, { Select } from "../../../components/Input";
import { Button } from "../../../components";
import '../../../styles/Parametrage.css';

function Genres() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [genres, setGenres] = useState('');
  const [showListeGenres, setShowListeGenres] = useState(false);
  

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

  const handleGenres = async () => {
    try {
      const data = {
        valeur: genres
      };
      const response = await createGenre(data);
      if (response.success) {
        const params = await getAllParametres();
        setparametrages(params.data);
        setGenres('');
      } else {
        alert("Erreur lors de la création du poste");
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
        <h3>➕ Ajouter un nouveau genre</h3>
        <Input
          label="Libellé du genre"
          type="text"
          onChange={(e) => setGenres(e.target.value)}
          value={genres}
          placeholder="Ex: Masculin, Féminin, Non-binaire..."
        />
        <Button onClick={handleGenres} variant="primary">
          Ajouter un genre
        </Button>
      </div>

      {/* Section liste des genres */}
      <div className="list-container">
        <div className="list-header">
          <h3>Liste des genres ({parametrages.genres?.length || 0})</h3>
          <Button
            onClick={() => setShowListeGenres(prev => !prev)}
            variant="secondary"
          >
            {showListeGenres ? 'Masquer' : 'Afficher'}
          </Button>
        </div>

        {showListeGenres && (
          <div className="list-body">
            {parametrages.genres?.length === 0 ? (
              <div className="empty">
                🏢 Aucun genre configuré
                <p>Ajoutez votre premier genre ci-dessus</p>
              </div>
            ) : (
              parametrages.genres?.map((genre) => (
                <div key={genre.id_genre} className="list-item">
                  <div>
                    <h4>{genre.valeur}</h4>
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
export default Genres;
