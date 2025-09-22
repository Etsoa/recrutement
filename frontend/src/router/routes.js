// routes.js - Définition des chemins de routes (version simplifiée)
export const ROUTES = {
  // Routes publiques
  
  // HOME: '/',
  
  // Routes unite
  LOGIN: '/',

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
  HOME: '/home',
  CV: '/cv',
  CV_LIST: '/cv-list',
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
  }
};

// Helper pour obtenir le titre d'une route
export const getRouteTitle = (path) => {
  return ROUTE_METADATA[path]?.title || 'Page inconnue';
};

// Helper pour vérifier si une route doit être affichée dans la navigation
export const shouldShowInNav = (path) => {
  return ROUTE_METADATA[path]?.showInNav || false;
};

// Helper pour vérifier si une route nécessite une authentification
export const requiresAuth = (path) => {
  return ROUTE_METADATA[path]?.requiresAuth || false;
};
