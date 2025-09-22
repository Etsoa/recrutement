import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import QCMPage from '../pages/QCMPage';
import Layout from '../components/Layout';
import QCMLayout from '../components/QCMLayout';

// Importation des pages
import Home from '../pages/Home';
import Annonces from '../pages/Annonces';
import CandidaturePage from '../pages/CandidaturePage';
import DetailQCM from '../pages/DetailQCM';
import CVtest from '../pages/CVtest';
import CVList from '../pages/CVList';

// Composant de layout principal
import Layout from '../components/Layout';

// Routes protégées (peut être étendu avec l'authentification)
const ProtectedRoute = ({ children }) => {
  // Pour l'instant, toutes les routes sont accessibles
  // Vous pouvez ajouter ici la logique d'authentification
  return children;
};

// Composant 404
const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: 'var(--spacing-xl)',
    }}>
      <h1 style={{ 
        fontSize: 'var(--font-size-4xl)', 
        color: 'var(--color-primary)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        404
      </h1>
      <h2 style={{ 
        fontSize: 'var(--font-size-xl)', 
        color: 'var(--color-text)',
        marginBottom: 'var(--spacing-md)'
      }}>
        Page non trouvée
      </h2>
      <p style={{ 
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <button 
        onClick={() => window.history.back()}
        style={{
          padding: 'var(--spacing-sm) var(--spacing-lg)',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--border-radius)',
          cursor: 'pointer',
          fontSize: 'var(--font-size-base)'
        }}
      >
        Retourner
      </button>
    </div>
  );
};

// Configuration des routes principales
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes QCM sans Layout (pas de header/footer) */}
        {/* Route avec token dans l'URL - utilisée par le lien email */}
        <Route path="/qcm/:token" element={
          <QCMLayout>
            <QCMPage />
          </QCMLayout>
        } />
        
        {/* Route QCM avec query parameter - fallback */}
        <Route path="/qcm" element={
          <QCMLayout>
            <QCMPage />
          </QCMLayout>
        } />
        
        {/* Autres routes avec Layout normal */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/candidature/:annonceId" element={<CandidaturePage />} />
              <Route path="/detailQCM" element={<DetailQCM />} />
              <Route path="/cv" element={<CVtest />} />
              <Route path="/cv-list" element={<CVList />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;
