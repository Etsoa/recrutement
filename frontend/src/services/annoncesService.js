// services/annoncesService.js - Service pour la gestion des annonces
import { api } from './api';

const ANNONCES_ENDPOINTS = {
  LIST: '/unite/annonces-unite',
  DETAILS: '/unite/annonce-unite',
  SEND_QCM: '/unite/send/qcm-candidat',
  SEND_ENTRETIEN: '/unite/send/unite-entretien'
};

export const annoncesService = {
  // Initialiser la session avec l'id_unite
  initializeSession: () => {
    // Vérifier si l'utilisateur est connecté
    const idUnite = localStorage.getItem('id_unite');
    if (!idUnite) {
      console.warn('Aucune unité connectée. L\'utilisateur doit se connecter.');
      return false;
    }
    return true;
  },

  // Récupérer l'id_unite depuis le localStorage
  getIdUnite: () => {
    return localStorage.getItem('id_unite');
  },

  // Vérifier si l'utilisateur est connecté
  isLoggedIn: () => {
    return !!localStorage.getItem('id_unite') && !!localStorage.getItem('token');
  },

  // Récupérer l'unité connectée
  getSelectedUnite: () => {
    return localStorage.getItem('selectedUnite');
  },

  // Récupérer la liste des annonces
  getAllAnnonces: async () => {
    try {
      // Vérifier que l'utilisateur est connecté
      if (!annoncesService.isLoggedIn()) {
        return { success: false, message: 'Utilisateur non connecté' };
      }
      
      // Récupérer l'id_unite depuis le localStorage
      const idUnite = annoncesService.getIdUnite();
      
      // Envoyer l'id_unite comme paramètre de requête
      const response = await api.get(ANNONCES_ENDPOINTS.LIST, {
        id_unite: idUnite
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
      throw error;
    }
  },

  // Récupérer les annonces par unité (méthode spécifique)
  getAnnoncesByUnite: async (idUnite) => {
    try {
      if (!idUnite) {
        throw new Error('ID unité requis');
      }
      
      // Appel API avec l'ID de l'unité en paramètre
      const response = await api.get(ANNONCES_ENDPOINTS.LIST, {
        id_unite: idUnite
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces par unité:', error);
      throw error;
    }
  },

  // Récupérer les détails d'une annonce avec ses candidats
  getAnnonceById: async (idAnnonce) => {
    try {
      const response = await api.get(ANNONCES_ENDPOINTS.DETAILS, {
        id: idAnnonce
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'annonce:', error);
      throw error;
    }
  },

  // Envoyer un QCM à un candidat
  sendQcmCandidat: async (idCandidat) => {
    try {
      const response = await api.post(ANNONCES_ENDPOINTS.SEND_QCM, {}, {
        id: idCandidat
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du QCM:', error);
      throw error;
    }
  },

  // Envoyer une convocation d'entretien
  sendUniteEntretien: async (idCandidat, dateEntretien, duree) => {
    try {
      const response = await api.post(ANNONCES_ENDPOINTS.SEND_ENTRETIEN, {}, {
        id: idCandidat
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la convocation d\'entretien:', error);
      throw error;
    }
  }
};

export default annoncesService;