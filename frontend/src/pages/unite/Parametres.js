import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderUnite";
import '../../styles/Parametrage.css';
import Postes from "./parametres/Postes";
import Genres from "./parametres/Genres";
import Villes from "./parametres/Villes";
import Niveau from "./parametres/Niveau";
import Filieres from "./parametres/Filieres";
import Domaines from "./parametres/Domaines";
import Langues from "./parametres/Langues";
import Qualites from "./parametres/Qualites";
import QuestionsReponses from "./parametres/QuestionsReponses";
import { Button } from "../../components";
// import SituationMatrimoniale from "./parametres/SituationMatrimoniale";

function Parametres() {
  const navigate = useNavigate();
  return (
    <div>
      <main className="App-main" style={{ padding: '20px' }}>
        <Button
          variant="primary"
          onClick={() => navigate(-1)}
        >
          Retour
        </Button>
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Parametrages des besoins:</h1>
        <div className="param-row">
          <Postes />
          <Genres />
        </div>
        <div className="param-row">
          <Villes />
          <Niveau />
        </div>
        <div className="param-row">
          <Filieres />
          <Domaines />
        </div>
        <div className="param-row">
          <Langues />
          <Qualites />
        </div>
        <div className="param-row">
          <QuestionsReponses />
          {/* <SituationMatrimoniale /> */}
        </div>
      </main>
    </div>
  );
};
export default Parametres;
