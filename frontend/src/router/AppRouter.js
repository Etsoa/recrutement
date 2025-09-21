import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import Layout from '../components/Layout';

// Importation des pages
import Home from '../pages/Home';
import { ListeAnnonces, DetailsAnnonce, FicheCandidat } from '../pages';
import { ROUTES } from './routes';

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes avec Layout */}
        <Route path={ROUTES.HOME} element={<Layout><Home /></Layout>} />
        <Route path={ROUTES.LISTE_ANNONCES} element={<Layout><ListeAnnonces /></Layout>} />
        <Route path={ROUTES.DETAILS_ANNONCE} element={<Layout><DetailsAnnonce /></Layout>} />
        <Route path={ROUTES.FICHE_CANDIDAT} element={<Layout><FicheCandidat /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;