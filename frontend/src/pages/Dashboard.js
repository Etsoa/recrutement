import { useNavigate } from "react-router-dom";
// import { getAllUnites, loginUnite } from "../api/unitesApi";
import Header from "../components/Header";
import { Button } from "../components";

function Dashboard() {
    const navigate = useNavigate();

    const deconnexion = async () => {
        try {
            localStorage.removeItem('unite');
            navigate("/back-office   ");
        } catch (error) {
            alert("Erreur serveur");
            console.error("Erreur complète:", error.response ? error.response : error);
        }
    };
    return (
        <div>
            <Header />
            <main className="App-main" style={{ padding: '20px' }}>
                <h1>Acceuil</h1>
                <Button onClick={() => navigate("/back-office/parametres")}>
                    Parametres
                </Button>
                <Button onClick={() => navigate("/back-office/createAnnonce")}>
                    Créer une annonce
                </Button>
                 <Button onClick={() => navigate("/back-office/listeAnnonce")}>
                    Liste d'annonces
                </Button>
                <Button onClick={deconnexion}>
                    Deconnexion
                </Button>
            </main>
        </div>
    );
}

export default Dashboard;
