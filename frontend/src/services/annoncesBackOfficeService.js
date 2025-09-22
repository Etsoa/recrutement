// services/annoncesBackOfficeService.js - Service pour la gestion des annonces en back-office
import { api } from './api';

const ANNONCE_ENDPOINTS = {
  PARAMETRES: '/unite/parametres',
  CREATE_ANNONCE: '/unite/create/annonce',
  ADD_NIVEAU_FILIERE: '/unite/add/niveau_filiere',
  ADD_EXPERIENCE: '/unite/add/experienceAnnonce',
  ADD_LANGUES: '/unite/add/langues',
  ADD_QUALITES: '/unite/add/qualites',
  QCM_ANNONCE: '/unite/qcmAnnonce',
  CREATE_QCM: '/unite/create/qcm',
  STATUS_ANNONCE: '/unite/create/statusAnnonce',
  ALL_ANNONCES: '/unite/annonces',
  ANNONCE_BY_ID: '/unite/annonces',
  LANGUES_BY_ANNONCE: '/unite/languesAnnonce',
  LANGUE_BY_ID: '/unite/getLangueById',
  DETAILS_ANNONCE: '/unite/detailsAnnonceById',
  DETAILS_HISTORIQUE: '/unite/detailsHistoriqueAnnonce',
  DETAILS_QR: '/unite/detailsQRAnnonce',
};

export const annoncesBackOfficeService = {
  // Récupérer tous les paramètres nécessaires pour créer une annonce
  getAllParametres: async () => {
    try {
      const response = await api.get(ANNONCE_ENDPOINTS.PARAMETRES);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      throw error;
    }
  },

  // Créer une nouvelle annonce
  createAnnonce: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.CREATE_ANNONCE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
      throw error;
    }
  },

  // Ajouter niveau et filière à une annonce
  createNiveauFiliere: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.ADD_NIVEAU_FILIERE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du niveau/filière:', error);
      throw error;
    }
  },

  // Ajouter une expérience à une annonce
  createExperienceAnnonce: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.ADD_EXPERIENCE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'expérience:', error);
      throw error;
    }
  },

  // Ajouter des langues à une annonce
  createLanguesAnnonce: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.ADD_LANGUES, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'ajout des langues:', error);
      throw error;
    }
  },

  // Ajouter des qualités à une annonce
  createQualitesAnnonce: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.ADD_QUALITES, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'ajout des qualités:', error);
      throw error;
    }
  },

  // Récupérer le QCM d'une annonce
  getQCMAnnonce: async (idAnnonce) => {
    try {
      const response = await api.get(`${ANNONCE_ENDPOINTS.QCM_ANNONCE}/${idAnnonce}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du QCM:', error);
      throw error;
    }
  },

  // Créer un QCM pour une annonce
  createQcmAnnonce: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.CREATE_QCM, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du QCM:', error);
      throw error;
    }
  },

  // Modifier le statut d'une annonce
  statusAnnonce: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.STATUS_ANNONCE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
      throw error;
    }
  },

  // Récupérer toutes les annonces
  getAllAnnonces: async (data) => {
    try {
      const response = await api.post(ANNONCE_ENDPOINTS.ALL_ANNONCES, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
      throw error;
    }
  },

  // Récupérer une annonce par ID
  getAnnonceById: async (id) => {
    try {
      const response = await api.get(`${ANNONCE_ENDPOINTS.ANNONCE_BY_ID}/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'annonce:', error);
      throw error;
    }
  },

  // Récupérer les langues d'une annonce
  getLanguesByAnnonce: async (id) => {
    try {
      const response = await api.get(`${ANNONCE_ENDPOINTS.LANGUES_BY_ANNONCE}/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des langues:', error);
      throw error;
    }
  },

  // Récupérer une langue par ID
  getLangueById: async (id) => {
    try {
      const response = await api.get(`${ANNONCE_ENDPOINTS.LANGUE_BY_ID}/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de la langue:', error);
      throw error;
    }
  },

  // Récupérer les détails d'une annonce par ID
  getDetailsAnnonceById: async (id) => {
    try {
      const response = await api.get(`${ANNONCE_ENDPOINTS.DETAILS_ANNONCE}/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'annonce:', error);
      throw error;
    }
  },

  // Récupérer les détails de l'historique d'une annonce
  getDetailsHistorique: async (id) => {
    try {
      const response = await api.get(`${ANNONCE_ENDPOINTS.DETAILS_HISTORIQUE}/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      throw error;
    }
  },

  // Récupérer les détails des questions/réponses d'une annonce
  getDetailsQR: async (id) => {
    try {
      const response = await api.get(`${ANNONCE_ENDPOINTS.DETAILS_QR}/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des questions/réponses:', error);
      throw error;
    }
  },
};

export default annoncesBackOfficeService;