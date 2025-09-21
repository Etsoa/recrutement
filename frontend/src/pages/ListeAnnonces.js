import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout, { Container, Section } from '../components/Layout';
import Button from '../components/Button';
import annoncesService from '../services/annoncesService';
import '../styles/ListeAnnonces.css';

const ListeAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        setLoading(true);
        const response = await annoncesService.getAllAnnonces();
        // L'API retourne { message, data, success }
        setAnnonces(response.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des annonces:', err);
        setError('Erreur lors du chargement des annonces');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  const handleVoirDossiers = (idAnnonce) => {
    navigate(`/details-annonce/${idAnnonce}`);
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Section>
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Chargement des annonces...</p>
            </div>
          </Section>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container>
          <Section>
            <div className="error-container">
              <h2>Erreur</h2>
              <p>{error}</p>
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </div>
          </Section>
        </Container>
      </Layout>
    );
  }

  return (
      <Container>
        <Section>
          <div className="liste-annonces">
            <div className="liste-annonces__header">
              <h1>Liste des Annonces</h1>
              <p className="liste-annonces__subtitle">
                {annonces.length} annonce{annonces.length > 1 ? 's' : ''} disponible{annonces.length > 1 ? 's' : ''}
              </p>
            </div>

            {annonces.length === 0 ? (
              <div className="empty-state">
                <h3>Aucune annonce disponible</h3>
                <p>Il n'y a actuellement aucune annonce publiée.</p>
              </div>
            ) : (
              <div className="annonces-grid">
                {annonces.map((annonce) => (
                  <div key={annonce.id_annonce} className="annonce-card">
                    <div className="annonce-card__header">
                      <h3 className="annonce-card__poste">
                        {annonce.Poste?.valeur || 'Poste non défini'}
                      </h3>
                      <span className="annonce-card__id">
                        #{annonce.id_annonce}
                      </span>
                    </div>

                    <div className="annonce-card__details">
                      <div className="annonce-detail">
                        <span className="annonce-detail__label">Genre :</span>
                        <span className="annonce-detail__value">
                          {annonce.Genre?.valeur || 'Non spécifié'}
                        </span>
                      </div>

                      <div className="annonce-detail">
                        <span className="annonce-detail__label">Ville :</span>
                        <span className="annonce-detail__value">
                          {annonce.Ville?.valeur || 'Non spécifiée'}
                        </span>
                      </div>

                      <div className="annonce-detail">
                        <span className="annonce-detail__label">Âge :</span>
                        <span className="annonce-detail__value">
                          {annonce.age_min && annonce.age_max
                            ? `${annonce.age_min} - ${annonce.age_max} ans`
                            : annonce.age_min
                            ? `À partir de ${annonce.age_min} ans`
                            : annonce.age_max
                            ? `Jusqu'à ${annonce.age_max} ans`
                            : 'Non spécifié'
                          }
                        </span>
                      </div>
                    </div>

                    <div className="annonce-card__actions">
                      <Button
                        variant="primary"
                        onClick={() => handleVoirDossiers(annonce.id_annonce)}
                        fullWidth
                      >
                        Voir les dossiers
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </Container>
  );
};

export default ListeAnnonces;