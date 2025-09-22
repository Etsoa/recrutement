import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import Layout from '../components/Layout';

// Importation des pages
import { 
  Home, 
  ListeAnnonces, 
  DetailsAnnonce, 
  FicheCandidat,
  DetailQCM,
  Historiques,
  LoginUnites,
  Parametres,
  CreateAnnonce,
  QCM
} from '../pages';
import { ROUTES } from './routes';

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques avec Layout */}
        {/* <Route path={ROUTES.HOME} element={<Layout><Home /></Layout>} /> */}
        
        {/* Routes unite */}
        <Route path={ROUTES.LOGIN} element={<LoginUnites />} />

        <Route path={ROUTES.LISTE_ANNONCES} element={<Layout><ListeAnnonces /></Layout>} />
        <Route path={ROUTES.DETAILS_ANNONCE} element={<Layout><DetailsAnnonce /></Layout>} />
        <Route path={ROUTES.FICHE_CANDIDAT} element={<Layout><FicheCandidat /></Layout>} />

        <Route path={ROUTES.PARAMETRES} element={<Layout><Parametres /></Layout>} />

        <Route path={ROUTES.CREATE_ANNONCE} element={<Layout><CreateAnnonce /></Layout>} />
        <Route path={ROUTES.UPDATE_ANNONCE} element={<Layout><CreateAnnonce /></Layout>} />
        <Route path={ROUTES.CREATE_QCM} element={<Layout><QCM /></Layout>} />
        <Route path={ROUTES.DETAIL_QCM} element={<Layout><DetailQCM /></Layout>} />
        <Route path={ROUTES.HISTORIQUE} element={<Layout><Historiques /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;