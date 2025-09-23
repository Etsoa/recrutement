import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { annoncesService } from "./services/annoncesService";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/variables.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, LoginCeo } from "./pages";
import { EmployeCEOList, SuggestionTable, EmpContratEssaiList } from "./components";
// Composant de layout principal
import Layout from './components/Layout';
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

  return <AppRouter />;
}
  return (
    <Router>
      <Routes>
        {/* Unité */}
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

        {/* Home */}
        <Route path={ROUTES.HOME} element={<Home />} />

        {/* CEO */}
        <Route path={ROUTES.LOGIN_CEO} element={<LoginCeo />} />
        <Route path={ROUTES.CEO_EMP_LIST} element={<EmployeCEOList />} />
        <Route path={ROUTES.CEO_SUGG_TABLE} element={<SuggestionTable />} />
        <Route path={ROUTES.CEO_CONTRAT_LIST} element={<EmpContratEssaiList />} />
      </Routes>
    </Router>
  );
}
export default App;
