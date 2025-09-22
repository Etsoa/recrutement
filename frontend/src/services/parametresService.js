// services/parametresService.js - Service pour la gestion des paramètres
import { api } from './api';

const PARAMETRES_ENDPOINTS = {
  ALL: '/unite/parametres',
  POSTES_BY_UNITE: '/unite/postesByUnite',
  CREATE_POSTE: '/unite/create/poste',
  UPDATE_POSTE: '/unite/update/poste',
  CREATE_GENRE: '/unite/create/genre',
  CREATE_VILLE: '/unite/create/ville',
  CREATE_NIVEAU: '/unite/create/niveau',
  CREATE_FILIERE: '/unite/create/filiere',
  CREATE_DOMAINE: '/unite/create/domaine',
  CREATE_LANGUE: '/unite/create/langue',
  CREATE_QUALITE: '/unite/create/qualite',
  CREATE_QUESTION: '/unite/create/questions',
  CREATE_REPONSE: '/unite/create/reponses',
  QUESTIONS_REPONSES: '/unite/questionsReponses',
};

export const parametresService = {
  // Récupérer tous les paramètres
  getAllParametres: async () => {
    try {
      const response = await api.get(PARAMETRES_ENDPOINTS.ALL);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      throw error;
    }
  },

  // Récupérer les postes par unité
  getPostesByIdUnite: async (id) => {
    try {
      const response = await api.get(`${PARAMETRES_ENDPOINTS.POSTES_BY_UNITE}/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des postes:', error);
      throw error;
    }
  },

  // Créer un nouveau poste
  createPoste: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_POSTE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du poste:', error);
      throw error;
    }
  },

  // Mettre à jour un poste
  updatePoste: async (data) => {
    try {
      const response = await api.put(PARAMETRES_ENDPOINTS.UPDATE_POSTE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du poste:', error);
      throw error;
    }
  },

  // Créer un genre
  createGenre: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_GENRE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du genre:', error);
      throw error;
    }
  },

  // Créer une ville
  createVille: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_VILLE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la ville:', error);
      throw error;
    }
  },

  // Créer un niveau
  createNiveau: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_NIVEAU, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du niveau:', error);
      throw error;
    }
  },

  // Créer une filière
  createFiliere: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_FILIERE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la filière:', error);
      throw error;
    }
  },

  // Créer un domaine
  createDomaine: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_DOMAINE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du domaine:', error);
      throw error;
    }
  },

  // Créer une langue
  createLangue: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_LANGUE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la langue:', error);
      throw error;
    }
  },

  // Créer une qualité
  createQualite: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_QUALITE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la qualité:', error);
      throw error;
    }
  },

  // Créer une question QCM
  createQuestionQcm: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_QUESTION, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la question QCM:', error);
      throw error;
    }
  },

  // Créer une réponse QCM
  createReponseQcm: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.CREATE_REPONSE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la réponse QCM:', error);
      throw error;
    }
  },

  // Récupérer les questions et réponses
  getQuestionsReponses: async () => {
    try {
      const response = await api.get(PARAMETRES_ENDPOINTS.QUESTIONS_REPONSES);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des questions/réponses:', error);
      throw error;
    }
  },
};

export default parametresService;