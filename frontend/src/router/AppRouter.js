import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import Layout from '../components/Layout';

// Importation des pages
import { 
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
import Home from '../pages/Home';
import { ROUTES } from './routes';

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Route par défaut */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Routes publiques */}
          <Route path="/home" element={<Home />} />
          
          {/* Routes unite */}
          <Route path={ROUTES.LOGIN} element={<LoginUnites />} />
          <Route path={ROUTES.LISTE_ANNONCES} element={<ListeAnnonces />} />
          <Route path={ROUTES.DETAILS_ANNONCE} element={<DetailsAnnonce />} />
          <Route path={ROUTES.FICHE_CANDIDAT} element={<FicheCandidat />} />
          <Route path={ROUTES.PARAMETRES} element={<Parametres />} />
          <Route path={ROUTES.CREATE_ANNONCE} element={<CreateAnnonce />} />
          <Route path={ROUTES.UPDATE_ANNONCE} element={<CreateAnnonce />} />
          <Route path={ROUTES.CREATE_QCM} element={<QCM />} />
          <Route path={ROUTES.DETAIL_QCM} element={<DetailQCM />} />
          <Route path={ROUTES.HISTORIQUE} element={<Historiques />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;