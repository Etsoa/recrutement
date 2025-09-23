// routes.js - Constantes des chemins de routes
export const ROUTES = {
  // Routes publiques
  HOME: '/',
  
  // Routes Back-Office Unite
  LOGIN_UNITES: '/login-unites',
  LISTE_ANNONCES: '/back-office/liste-annonces',
  DETAILS_ANNONCE: '/back-office/details-annonce/:idAnnonce',
  FICHE_CANDIDAT: '/back-office/fiche-candidat/:idCandidat',
  PARAMETRES: '/back-office/parametres',
  CREATE_ANNONCE: '/back-office/create-annonce',
  UPDATE_ANNONCE: '/back-office/update-annonce',
  CREATE_QCM: '/back-office/create-qcm/:id',
  DETAIL_QCM: '/back-office/detail-qcm/:id',
  HISTORIQUE: '/back-office/historique',
  // Nouvelles routes Unité
  UNITE_CALENDRIER: '/back-office/calendrier',
  UNITE_SUGGESTIONS: '/back-office/suggestions',
  UNITE_RH_SUGGESTIONS: '/back-office/rh-suggestions',
  
  // Routes RH
  RH_LOGIN: '/rh/login',
  RH_CALENDRIER: '/rh/calendrier',
  RH_SUGGESTIONS: '/rh/suggestions',
  RH_CEO_SUGGESTIONS: '/rh/ceo-suggestions',
  RH_FORM_ANNONCE: '/rh/form-annonce',
  STATISTIQUES: '/rh/statistiques',
  
  // Routes CEO
  LOGIN_CEO: '/ceo/login',
  CEO_EMP_LIST: '/ceo/employes',
  CEO_SUGG_TABLE: '/ceo/suggestions',
  CEO_CONTRAT_LIST: '/ceo/contrats',
  
  // Routes publiques candidats
  CV_PUBLIC: '/public/cv',
  CV_LIST_PUBLIC: '/public/cv-list'
};

// Métadonnées des routes pour la navigation
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Accueil',
    requiresAuth: false,
    layout: true
  },
  [ROUTES.LISTE_ANNONCES]: {
    title: 'Liste des annonces',
    requiresAuth: true,
    layout: true
  },
  [ROUTES.DETAILS_ANNONCE]: {
    title: 'Détails de l\'annonce',
    requiresAuth: true,
    layout: true
  },
  [ROUTES.PARAMETRES]: {
    title: 'Paramètres',
    requiresAuth: true,
    layout: true
  },
  [ROUTES.UNITE_CALENDRIER]: {
    title: 'Calendrier des Entretiens',
    requiresAuth: true,
    layout: true
  },
  [ROUTES.UNITE_SUGGESTIONS]: {
    title: 'Candidats à Suggérer',
    requiresAuth: true,
    layout: true
  },
  [ROUTES.UNITE_RH_SUGGESTIONS]: {
    title: 'Suggestions Envoyées',
    requiresAuth: true,
    layout: true
  },
  [ROUTES.LOGIN_UNITES]: {
    title: 'Connexion',
    requiresAuth: false,
    layout: false
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
    title: 'Contrats d\'essai',
    icon: 'work',
    showInNav: true,
    requiresAuth: true
  },
  [ROUTES.STATISTIQUES]: {
    title: 'Statistiques',
    requiresAuth: true,
    layout: true
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