import React, { useEffect } from "react";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, LoginCeo } from "./pages";
import { EmployeCEOList, SuggestionTable, EmpContratEssaiList } from "./components";
// Composant de layout principal
import Layout from './components/Layout';
import CeoLayout from './components/layouts/CeoLayout';
import { annoncesService } from "./services/annoncesService";
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
} from './pages';

import { ROUTES } from './router/routes';

function App() {
  useEffect(() => {
    annoncesService.initializeSession();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path={ROUTES.LOGIN_CEO} element={<LoginCeo />} />
        <Route path={ROUTES.LOGIN} element={<LoginUnites />} />

        {/* Routes CEO protégées */}
        <Route element={<CeoLayout />}>
          <Route path={ROUTES.CEO_EMP_LIST} element={<EmployeCEOList />} />
          <Route path={ROUTES.CEO_SUGG_TABLE} element={<SuggestionTable />} />
          <Route path={ROUTES.CEO_CONTRAT_LIST} element={<EmpContratEssaiList />} />
        </Route>

        {/* Routes Unité */}
        <Route element={<Layout />}>
          <Route path={ROUTES.LISTE_ANNONCES} element={<ListeAnnonces />} />
          <Route path={ROUTES.DETAILS_ANNONCE} element={<DetailsAnnonce />} />
          <Route path={ROUTES.FICHE_CANDIDAT} element={<FicheCandidat />} />
          <Route path={ROUTES.PARAMETRES} element={<Parametres />} />
          <Route path={ROUTES.CREATE_ANNONCE} element={<CreateAnnonce />} />
          <Route path={ROUTES.UPDATE_ANNONCE} element={<CreateAnnonce />} />
          <Route path={ROUTES.CREATE_QCM} element={<QCM />} />
          <Route path={ROUTES.DETAIL_QCM} element={<DetailQCM />} />
          <Route path={ROUTES.HISTORIQUE} element={<Historiques />} />
        </Route>

        {/* Home */}
        <Route path={ROUTES.HOME} element={<Home />} />

        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
      </Routes>
    </Router>
  );
}
export default App;
