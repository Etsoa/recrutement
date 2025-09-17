import React, { useState, useEffect } from 'react';
import { CV } from '../components';

// Page de test pour le composant CV
const CVtest = () => {
  const [cvData, setCvData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulation de chargement des données CV (peut venir d'une API)
  useEffect(() => {
    const loadCVData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulation d'un délai de chargement API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données CV simulées (remplacer par un appel API réel)
        const data = {
          // Informations personnelles
          nom: 'RAKOTO',
          prenom: 'Jean',
          dateNaissance: '1990-05-15',
          cin: '101 234 567 890',
          email: 'jean.rakoto@email.com',
          contact: '+261 34 12 456 78',
          ville: 'Antananarivo',
          photo: null, // URL de la photo ou null pour afficher les initiales
          genre: 'Masculin',
          nombreEnfants: 2,
          situationMatrimoniale: 'Marié',
          
          // Formation
          filiere: 'Informatique',
          niveau: 'Master en Génie Logiciel',
          
          // Compétences linguistiques
          langues: ['Français', 'Anglais', 'Malagasy'],
          
          // Qualités personnelles
          qualites: [
            'Dynamique',
            'Autonome', 
            'Esprit d\'équipe',
            'Organisé',
            'Créatif',
            'Rigoureux'
          ],
          
          // Expériences professionnelles actuelles
          experiences: [
            {
              poste: 'Développeur Full Stack',
              entreprise: 'TechSolutions Madagascar',
              dateDebut: 'Mars 2020',
              dateFin: 'Présent',
              description: 'Développement d\'applications web avec React, Node.js et MongoDB. Gestion de projets en équipe agile.'
            },
            {
              poste: 'Développeur Frontend',
              entreprise: 'Digital Agency Mada',
              dateDebut: 'Juin 2018',
              dateFin: 'Février 2020',
              description: 'Création d\'interfaces utilisateur responsive avec HTML, CSS, JavaScript et React.'
            }
          ],
          
          // Historique des anciens emplois
          passifEntreprises: [
            {
              poste: 'Stagiaire Développeur',
              entreprise: 'StartUp Innovation',
              dateQuite: '2018-05-30',
              raisonQuite: 'Fin de stage - Obtention d\'un poste permanent ailleurs'
            },
            {
              poste: 'Assistant IT',
              entreprise: 'Entreprise Locale',
              dateQuite: '2017-12-15',
              raisonQuite: 'Recherche d\'opportunités dans le développement web'
            }
          ],
          
          // Scores d'évaluation (simulés)
          scoreQCM: 16,
          scoreEntretienUnite: null, // Pas encore passé
          scoreEntretienRH: 18
        };

        setCvData(data);
      } catch (err) {
        setError('Erreur lors du chargement du CV');
        console.error('Erreur de chargement CV:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCVData();
  }, []);

  // Fonction pour mettre à jour les données CV
  const updateCVData = (field, value) => {
    setCvData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Fonction pour ajouter une expérience
  const addExperience = (newExperience) => {
    setCvData(prevData => ({
      ...prevData,
      experiences: [...(prevData.experiences || []), newExperience]
    }));
  };

  // Fonction pour ajouter une qualité
  const addQuality = (newQuality) => {
    if (newQuality && !cvData.qualites?.includes(newQuality)) {
      setCvData(prevData => ({
        ...prevData,
        qualites: [...(prevData.qualites || []), newQuality]
      }));
    }
  };

  // Fonctions de gestion des évaluations
  const handleDownloadCV = () => {
    console.log('Téléchargement du CV pour:', cvData.prenom, cvData.nom);
    // Ici on peut implémenter la logique de téléchargement PDF
    alert('Fonctionnalité de téléchargement à implémenter');
  };

  const handleSendQCM = () => {
    console.log('Envoi QCM pour:', cvData.prenom, cvData.nom);
    alert('QCM envoyé avec succès!');
  };

  const handleScheduleUnitInterview = () => {
    console.log('Planification entretien unité pour:', cvData.prenom, cvData.nom);
    alert('Entretien unité planifié!');
  };

  const handleScheduleRHInterview = () => {
    console.log('Planification entretien RH pour:', cvData.prenom, cvData.nom);
    alert('Entretien RH planifié!');
  };

  // Affichage de l'état de chargement
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        color: 'var(--color-text-secondary)'
      }}>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Chargement du CV...
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--color-background)',
            borderTop: '3px solid var(--color-accent)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      </div>
    );
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--color-danger)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-danger)',
        borderRadius: 'var(--border-radius)',
        margin: '2rem'
      }}>
        <h3>Erreur de chargement</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer'
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <CV 
        {...cvData}
        showQRCode={true}
        isEditable={false}
        onDownloadCV={handleDownloadCV}
        onSendQCM={handleSendQCM}
        onScheduleUnitInterview={handleScheduleUnitInterview}
        onScheduleRHInterview={handleScheduleRHInterview}
      />
    </div>
  );
};

export default CVtest;
