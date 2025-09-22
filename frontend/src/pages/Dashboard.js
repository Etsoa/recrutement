import { useNavigate } from "react-router-dom";
// import { getAllUnites, loginUnite } from "../api/unitesApi";
import Header from "../components/Header";
import { Button } from "../components";
import "../styles/axiom-style.css";

function Dashboard() {
    const navigate = useNavigate();

    const menuItems = [
    {
      id: 'parametres',
      title: 'Paramètres',
      description: 'Configurer les paramètres système et les préférences utilisateur',
      icon: '⚙️',
      route: '/back-office/parametres',
      variant: 'parametres',
      buttonClass: 'secondary'
    },
    {
      id: 'create',
      title: 'Créer une annonce',
      description: 'Publier une nouvelle annonce sur la plateforme',
      icon: '✏️',
      route: '/back-office/createAnnonce',
      variant: 'create',
      buttonClass: 'success'
    },
    {
      id: 'liste',
      title: 'Liste d\'annonces',
      description: 'Consulter et gérer toutes les annonces existantes',
      icon: '📋',
      route: '/back-office/listeAnnonce',
      variant: 'liste',
      buttonClass: 'primary'
    }
  ];
    const handleNavigation = (route) => {
    navigate(route);
  };


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
            {/* <main className="App-main" style={{ padding: '20px' }}>
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
            </main> */}
            <main className="dashboard-main">
                <div className="dashboard-container">
                    <header className="dashboard-header">
                        <h1 className="dashboard-title">Tableau de bord</h1>
                        <p className="dashboard-subtitle">
                            Gérez votre plateforme d'annonces en toute simplicité
                        </p>
                    </header>

                    <div className="menu-grid">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`menu-card ${item.variant}`}
                                onClick={() => handleNavigation(item.route)}
                            >
                                <div className={`menu-icon ${item.variant}`}>
                                    {item.icon}
                                </div>
                                <h2 className="menu-title">{item.title}</h2>
                                <p className="menu-description">{item.description}</p>
                                <button
                                    className={`menu-button ${item.buttonClass}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavigation(item.route);
                                    }}
                                >
                                    Accéder
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="logout-section">
                        <button
                            className="logout-button"
                            onClick={deconnexion}
                        >
                            Se déconnecter
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
