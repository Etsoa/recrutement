
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Section, Button } from '../components';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            App de Recrutement
          </h1>
          <p className="hero-subtitle">
            Connectons les talents aux opportunités. Notre plateforme moderne facilite 
            la rencontre entre candidats qualifiés et entreprises d'exception.
          </p>
        </div>
      </Section>
    </Container>
  );
}

export default Home;
