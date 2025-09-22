import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import LayoutUnite from '../components/LayoutUnite';
import LayoutRh from '../components/LayoutRh';

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
  // Nouvelles pages Unité
  UniteCalendrier,
  UniteSuggestions,
  UniteRhSuggestions,
  // Pages RH
  RhLoginRh,
  RhCalendrier,
  RhSuggestions,
  RhCeoSuggestions,
  RhFormAnnonce
} from '../pages';

import { ROUTES, ROUTE_METADATA } from './routes';

// Composant 404
const NotFound = () => (
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
);

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Routes>
         {/* Page d'accueil */}
        <Route path={ROUTES.HOME} element={<Home />} />

        {/* Page de connexion (sans layout) */}
        <Route path={ROUTES.LOGIN_UNITES} element={<LoginUnites />} />
        
        {/* Routes Back-Office Unite */}
        <Route path={ROUTES.LISTE_ANNONCES} element={<LayoutUnite><ListeAnnonces /></LayoutUnite>} />
        <Route path={ROUTES.DETAILS_ANNONCE} element={<LayoutUnite><DetailsAnnonce /></LayoutUnite>} />
        <Route path={ROUTES.FICHE_CANDIDAT} element={<LayoutUnite><FicheCandidat /></LayoutUnite>} />
        <Route path={ROUTES.PARAMETRES} element={<LayoutUnite><Parametres /></LayoutUnite>} />
        <Route path={ROUTES.CREATE_ANNONCE} element={<LayoutUnite><CreateAnnonce /></LayoutUnite>} />
        <Route path={ROUTES.UPDATE_ANNONCE} element={<LayoutUnite><CreateAnnonce /></LayoutUnite>} />
        <Route path={ROUTES.CREATE_QCM} element={<LayoutUnite><QCM /></LayoutUnite>} />
        <Route path={ROUTES.DETAIL_QCM} element={<LayoutUnite><DetailQCM /></LayoutUnite>} />
        <Route path={ROUTES.HISTORIQUE} element={<LayoutUnite><Historiques /></LayoutUnite>} />
        {/* Nouvelles routes Unité */}
        <Route path={ROUTES.UNITE_CALENDRIER} element={<LayoutUnite><UniteCalendrier /></LayoutUnite>} />
        <Route path={ROUTES.UNITE_SUGGESTIONS} element={<LayoutUnite><UniteSuggestions /></LayoutUnite>} />
        <Route path={ROUTES.UNITE_RH_SUGGESTIONS} element={<LayoutUnite><UniteRhSuggestions /></LayoutUnite>} />
        
        {/* Routes RH (sans layout pour login, avec layout pour les autres) */}
        <Route path={ROUTES.RH_LOGIN} element={<RhLoginRh />} />
        <Route path={ROUTES.RH_CALENDRIER} element={<LayoutRh><RhCalendrier /></LayoutRh>} />
        <Route path={ROUTES.RH_SUGGESTIONS} element={<LayoutRh><RhSuggestions /></LayoutRh>} />
        <Route path={ROUTES.RH_CEO_SUGGESTIONS} element={<LayoutRh><RhCeoSuggestions /></LayoutRh>} />
        <Route path={ROUTES.RH_FORM_ANNONCE} element={<LayoutRh><RhFormAnnonce /></LayoutRh>} />

        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;