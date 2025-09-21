import { useState, useEffect } from "react";
import { getAllAnnonces } from "../api/annonceApi";
import Header from "../components/Header";
import Annonce from "../components/AnnonceBO";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import '../styles/Parametrage.css';

function Annonces() {
  const navigate = useNavigate();
  const [listeAnnonces, setlisteAnnonces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAnnonces();
        setlisteAnnonces(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <Header />
      <Button
        variant="primary"
        onClick={() => navigate(-1)}>
        Retour
      </Button>
      <h1>Liste des annonces:</h1>
      {listeAnnonces.length === 0 ? (
        <p>Aucune annonce trouvée</p>
      ) : (
        listeAnnonces.map((annonce) => (
          <Annonce
            key={annonce.id_annonce}
            annonce={annonce}   // 👈 passe l’objet complet
          />
        ))
      )}
    </div>
  );
}

export default Annonces;
