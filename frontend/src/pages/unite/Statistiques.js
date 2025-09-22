import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { statService } from "../../services";
import { Button, Input } from "../../components";
import '../../styles/Parametrage.css';

function CreateAnnonce() {
  const navigate = useNavigate();
  const [parametrages, setparametrages] = useState([]);
  const [ageMin, setAgeMin] = useState(1);
  const [ageMax, setAgeMax] = useState(200);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          age1: ageMin,
          age2: ageMax
        }
        const response = await statService.getAllStats(data);
        setparametrages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAge = async () => {
    try {
      const data = {
        age1: ageMin,
        age2: ageMax
      }
      const response = await statService.getAllStats(data);
      setparametrages(response.data);
      // alert("ok");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => navigate(-1)}
      >
        retour
      </Button>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Statistique des candidats
      </h1>

      <main className="App-main" style={{ padding: '20px', justifyContent: "center", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Villes */}
        <div>
          âge min: {parametrages.age_min}, âge max: {parametrages.age_max}, âge moyen: {parametrages.age_moyen}
        </div>
        <div>
          <h2>Par Ville</h2>
          <ul>
            {parametrages.byVilles?.map((v, index) => (
              <li key={index}>{v.ville} : {v.total}</li>
            ))}
          </ul>
        </div>

        {/* Genres */}
        <div>
          <h2>Par Genre</h2>
          <ul>
            {parametrages.byGenre?.map((g, index) => (
              <li key={index}>{g.genre} : {g.total}</li>
            ))}
          </ul>
        </div>

        {/* Tranche d'âge dynamique */}
        <div>
          <Input
            label="Age maximum"
            type="number"
            onChange={(e) => setAgeMin(e.target.value)}
            value={ageMin}
          />
          <Input
            label="Age maximum"
            type="number"
            onChange={(e) => setAgeMax(e.target.value)}
            value={ageMax}
          />
          <Button
            variant="primary"
            onClick={handleAge}
          >
            Ajouter
          </Button>
          <h2>Nombre candidats dans la tranche demandée</h2>
          <p>{parametrages.byAgeRange}</p>
        </div>
      </main>

    </div>
  );
};
export default CreateAnnonce;