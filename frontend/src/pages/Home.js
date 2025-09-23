
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Section, Button } from '../components';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const handleVoirAnnonces = () => {
    navigate('/annonces');
  };

  return (
    <Container>
      <Section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bienvenue sur Axiom Recrutement
          </h1>
          <p className="hero-subtitle">
            Découvrez nos offres d'emploi et postulez en quelques clics.
          </p>
          <div className="hero-actions">
            <Button 
              variant="primary"
              size="lg"
              onClick={handleVoirAnnonces}
            >
              Voir les offres d'emploi
            </Button>
          </div>
        </div>
      </Section>
    </Container>
  );
}

export default Home;
