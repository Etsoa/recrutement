import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderUnite";
import '../../styles/ParametrageUnite.css';
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

function Parametres() {
  const navigate = useNavigate();
  return (
    <div className="parametrage-unite">
      <div className="parametrage-unite__container">
        <div className="parametrage-unite__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              style={{ marginRight: '1rem' }}
            >
              ← Retour
            </Button>
            <div>
              <h1 className="parametrage-unite__title">Configuration des Paramètres</h1>
              <p className="parametrage-unite__subtitle">Gérez les paramètres de votre unité</p>
            </div>
          </div>
        </div>
        
        <div className="parametrage-unite__section">
          <Postes />
        </div>
        
        <div className="parametrage-unite__section">
          <Genres />
        </div>
        
        <div className="parametrage-unite__section">
          <Villes />
        </div>
        
        <div className="parametrage-unite__section">
          <Niveau />
        </div>
        
        <div className="parametrage-unite__section">
          <Filieres />
        </div>
        
        <div className="parametrage-unite__section">
          <Domaines />
        </div>
        
        <div className="parametrage-unite__section">
          <Langues />
        </div>
        
        <div className="parametrage-unite__section">
          <Qualites />
        </div>
        
        <div className="parametrage-unite__section">
          <QuestionsReponses />
        </div>
      </div>
    </div>
  );
}
export default Parametres;
