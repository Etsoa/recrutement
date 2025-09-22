// routes.js - Définition des chemins de routes (version simplifiée)
export const ROUTES = {
  // Routes unite
  LOGIN: '/login-unite',
  LISTE_ANNONCES: '/liste-annonces',
  DETAILS_ANNONCE: '/details-annonce/:idAnnonce',
  FICHE_CANDIDAT: '/fiche-candidat/:idCandidat',

  PARAMETRES: '/back-office/parametres',
  CREATE_ANNONCE: '/back-office/createAnnonce',
  UPDATE_ANNONCE: '/back-office/updateAnnonce',
  CREATE_QCM: '/back-office/createQCM/:id',
  DETAIL_QCM: '/back-office/detailQCM/:id',
  HISTORIQUE: '/back-office/historique',

  // Routes principales
  HOME: '/',
  CV: '/cv',
  CV_LIST: '/cv-list',

  // Routes CEO
  LOGIN_CEO: '/login-ceo',
  CEO_EMP_LIST: '/ceo-emp-list',
  CEO_SUGG_TABLE: '/ceo-sugg-table',
  CEO_CONTRAT_LIST: '/emp-contrat-list'
};

// Métadonnées des routes pour la navigation
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Accueil',
    icon: 'home',
    showInNav: true,
    requiresAuth: false
  },
  [ROUTES.CV]: {
    title: 'CV Détail',
    icon: 'assignment',
    showInNav: true,
    requiresAuth: false
  },
  [ROUTES.CV_LIST]: {
    title: 'Liste des CVs',
    icon: 'list',
    showInNav: true,
    requiresAuth: false
  },
  [ROUTES.CEO_EMP_LIST]: {
    title: 'Employés',
    icon: 'people',
    showInNav: true,
    requiresAuth: true
  },
  [ROUTES.CEO_SUGG_TABLE]: {
    title: 'Suggestions',
    icon: 'lightbulb',
    showInNav: true,
    requiresAuth: true
  },
  [ROUTES.CEO_CONTRAT_LIST]: {
    title: 'Contrats d’essai',
    icon: 'work',
    showInNav: true,
    requiresAuth: true
  }
};

// Helpers
export const getRouteTitle = (path) => {
  return ROUTE_METADATA[path]?.title || 'Page inconnue';
};
export const shouldShowInNav = (path) => {
  return ROUTE_METADATA[path]?.showInNav || false;
};
export const requiresAuth = (path) => {
  return ROUTE_METADATA[path]?.requiresAuth || false;
};
