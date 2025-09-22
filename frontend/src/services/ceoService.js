// Service pour la gestion de l'authentification CEO

export const ceoService = {
  // Vérifier si le CEO est connecté
  isLoggedIn: () => {
    const token = localStorage.getItem('ceoToken');
    return !!token;
  },

  // Déconnexion du CEO
  logout: () => {
    localStorage.removeItem('ceoToken');
  },

  // Récupérer le token d'authentification
  getToken: () => {
    return localStorage.getItem('ceoToken');
  }
};

export default ceoService;
