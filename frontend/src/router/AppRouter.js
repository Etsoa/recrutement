import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import Layout from '../components/Layout';

// Importation des pages
import { 
  Home,
  LoginUnites,
  ListeAnnonces, 
  DetailsAnnonce, 
  FicheCandidat,
  DetailQCM,
  Historiques,
  Parametres,
  CreateAnnonce,
  QCM,
  RhLoginRh,
  RhCalendrier,
  RhSuggestions,
  RhCeoSuggestions,
  RhFormAnnonce
} from '../pages';

import { ROUTES, ROUTE_METADATA } from './routes';

// Composant de layout conditionnel
const ConditionalLayout = ({ children, path }) => {
  const shouldUseLayout = ROUTE_METADATA[path]?.layout !== false;
  return shouldUseLayout ? <Layout>{children}</Layout> : children;
};

// Composant 404
const NotFound = () => (
  <Layout>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '4rem', color: '#e74c3c', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page non trouvée</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <button 
        onClick={() => window.history.back()}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Retourner
      </button>
    </div>
  </Layout>
);

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Redirection racine vers login */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        
        {/* Page de connexion (sans layout) */}
        <Route path={ROUTES.LOGIN} element={<LoginUnites />} />
        
        {/* Page d'accueil */}
        <Route path={ROUTES.HOME} element={<Layout><Home /></Layout>} />
        
        {/* Routes Back-Office Unite */}
        <Route path={ROUTES.LISTE_ANNONCES} element={<Layout><ListeAnnonces /></Layout>} />
        <Route path={ROUTES.DETAILS_ANNONCE} element={<Layout><DetailsAnnonce /></Layout>} />
        <Route path={ROUTES.FICHE_CANDIDAT} element={<Layout><FicheCandidat /></Layout>} />
        <Route path={ROUTES.PARAMETRES} element={<Layout><Parametres /></Layout>} />
        <Route path={ROUTES.CREATE_ANNONCE} element={<Layout><CreateAnnonce /></Layout>} />
        <Route path={ROUTES.UPDATE_ANNONCE} element={<Layout><CreateAnnonce /></Layout>} />
        <Route path={ROUTES.CREATE_QCM} element={<Layout><QCM /></Layout>} />
        <Route path={ROUTES.DETAIL_QCM} element={<Layout><DetailQCM /></Layout>} />
        <Route path={ROUTES.HISTORIQUE} element={<Layout><Historiques /></Layout>} />
        
        {/* Routes RH (sans layout pour login, avec layout pour les autres) */}
        <Route path={ROUTES.RH_LOGIN} element={<RhLoginRh />} />
        <Route path={ROUTES.RH_CALENDRIER} element={<Layout><RhCalendrier /></Layout>} />
        <Route path={ROUTES.RH_SUGGESTIONS} element={<Layout><RhSuggestions /></Layout>} />
        <Route path={ROUTES.RH_CEO_SUGGESTIONS} element={<Layout><RhCeoSuggestions /></Layout>} />
        <Route path={ROUTES.RH_FORM_ANNONCE} element={<Layout><RhFormAnnonce /></Layout>} />
        
        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;