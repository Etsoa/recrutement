import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import LayoutUnite from '../components/LayoutUnite';
import LayoutRh from '../components/LayoutRh';
import LayoutCeo from '../components/LayoutCeo';

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
  StatistiquesUnite,
  // Pages RH
  RhLoginRh,
  RhCalendrier,
  RhSuggestions,
  RhCeoSuggestions,
  RhFormAnnonce,
  Statistiques,
  // Pages CEO
  LoginCeo,
  CeoEmpList,
  CeoSuggTable,
  CeoContratList
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
      <Switch>
         {/* Page d'accueil */}
        <Route exact path={ROUTES.HOME} component={Home} />

        {/* Page de connexion (sans layout) */}
        <Route exact path={ROUTES.LOGIN_UNITES} component={LoginUnites} />
        
        {/* Routes Back-Office Unite */}
        <Route exact path={ROUTES.LISTE_ANNONCES} render={() => <LayoutUnite><ListeAnnonces /></LayoutUnite>} />
        <Route exact path={ROUTES.DETAILS_ANNONCE} render={() => <LayoutUnite><DetailsAnnonce /></LayoutUnite>} />
        <Route exact path={ROUTES.FICHE_CANDIDAT} render={() => <LayoutUnite><FicheCandidat /></LayoutUnite>} />
        <Route exact path={ROUTES.PARAMETRES} render={() => <LayoutUnite><Parametres /></LayoutUnite>} />
        <Route exact path={ROUTES.CREATE_ANNONCE} render={() => <LayoutUnite><CreateAnnonce /></LayoutUnite>} />
        <Route exact path={ROUTES.UPDATE_ANNONCE} render={() => <LayoutUnite><CreateAnnonce /></LayoutUnite>} />
        <Route exact path={ROUTES.CREATE_QCM} render={() => <LayoutUnite><QCM /></LayoutUnite>} />
        <Route exact path={ROUTES.DETAIL_QCM} render={() => <LayoutUnite><DetailQCM /></LayoutUnite>} />
        <Route exact path={ROUTES.HISTORIQUE} render={() => <LayoutUnite><Historiques /></LayoutUnite>} />
        {/* Nouvelles routes Unité */}
        <Route exact path={ROUTES.UNITE_CALENDRIER} render={() => <LayoutUnite><UniteCalendrier /></LayoutUnite>} />
        <Route exact path={ROUTES.UNITE_SUGGESTIONS} render={() => <LayoutUnite><UniteSuggestions /></LayoutUnite>} />
        <Route exact path={ROUTES.UNITE_RH_SUGGESTIONS} render={() => <LayoutUnite><UniteRhSuggestions /></LayoutUnite>} />
        <Route exact path={ROUTES.UNITE_STATISTIQUES} render={() => <LayoutUnite><StatistiquesUnite /></LayoutUnite>} />
        
        {/* Routes RH (sans layout pour login, avec layout pour les autres) */}
        <Route exact path={ROUTES.RH_LOGIN} component={RhLoginRh} />
        {/* Route d'accueil RH - redirige vers Statistiques */}
        <Route exact path={ROUTES.RH_HOME} render={() => <Redirect to={ROUTES.STATISTIQUES} />} />
        <Route exact path={ROUTES.RH_CALENDRIER} render={() => <LayoutRh><RhCalendrier /></LayoutRh>} />
        <Route exact path={ROUTES.RH_SUGGESTIONS} render={() => <LayoutRh><RhSuggestions /></LayoutRh>} />
        <Route exact path={ROUTES.RH_CEO_SUGGESTIONS} render={() => <LayoutRh><RhCeoSuggestions /></LayoutRh>} />
        <Route exact path={ROUTES.RH_FORM_ANNONCE} render={() => <LayoutRh><RhFormAnnonce /></LayoutRh>} />
        <Route exact path={ROUTES.STATISTIQUES} render={() => <LayoutRh><Statistiques /></LayoutRh>} />
        
        {/* Routes CEO */}
        <Route exact path={ROUTES.LOGIN_CEO} component={LoginCeo} />
        <Route exact path={ROUTES.CEO_EMP_LIST} render={() => <LayoutCeo><CeoEmpList /></LayoutCeo>} />
        <Route exact path={ROUTES.CEO_SUGG_TABLE} render={() => <LayoutCeo><CeoSuggTable /></LayoutCeo>} />
        <Route exact path={ROUTES.CEO_CONTRAT_LIST} render={() => <LayoutCeo><CeoContratList /></LayoutCeo>} />

        {/* Route 404 */}
        <Route component={NotFound} />
        </Switch>
    </Router>
  );
};

export default AppRouter;
