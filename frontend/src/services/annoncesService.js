// services/annoncesService.js - Service pour la gestion des annonces
import { api } from './api';

const ANNONCES_ENDPOINTS = {
  LIST: '/unite/annonces',
  DETAILS: '/unite/annonce',
  SEND_QCM: '/unite/send/qcm-candidat',
  SEND_ENTRETIEN: '/unite/send/unite-entretien'
};

export const annoncesService = {
  // Initialiser la session fictive avec l'id_unite
  initializeSession: () => {
    // Créer une variable session fictive si elle n'existe pas
    if (!localStorage.getItem('id_unite')) {
      localStorage.setItem('id_unite', '1');
    }
  },

  // Récupérer l'id_unite depuis le localStorage
  getIdUnite: () => {
    return localStorage.getItem('id_unite') || '1';
  },

  // Récupérer la liste des annonces
  getAllAnnonces: async () => {
    try {
      // S'assurer que la session est initialisée
      annoncesService.initializeSession();
      
      // Récupérer l'id_unite depuis le localStorage
      const idUnite = annoncesService.getIdUnite();
      
      // Envoyer l'id_unite comme paramètre de requête
      const response = await api.get(ANNONCES_ENDPOINTS.LIST, {
        id: idUnite
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
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