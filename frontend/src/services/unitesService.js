// services/unitesService.js - Service pour la gestion des unités
import { api } from './api';

const UNITES_ENDPOINTS = {
  ALL: '/unite/',
  LOGIN: '/unite/login',
  // Nouvelles routes pour les entretiens
  ENTRETIENS_JOUR: '/unite/unite_entretiens_jour',
  ENTRETIENS_MOIS: '/unite/entretiens_mois',
  CREATE_ENTRETIEN: '/unite/create/unite_entretien',
  UPDATE_STATUS_ENTRETIEN: '/unite/update/status/unite_entretien',
  CREATE_SCORE_ENTRETIEN: '/unite/create/score/unite_entretien',
  // Routes pour les suggestions
  SUGGEST_TO_RH: '/unite/suggest/rh',
  GET_RH_SUGGESTIONS: '/unite/suggest',
  CANDIDATS_ELIGIBLES: '/unite/candidats/eligibles',
};

export const unitesService = {
  // Récupérer toutes les unités
  getAllUnites: async () => {
    try {
      const response = await api.get(UNITES_ENDPOINTS.ALL);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des unités:', error);
      throw error;
    }
  },

  // Connexion d'une unité
  loginUnite: async (username, password) => {
    try {
      const response = await api.post(UNITES_ENDPOINTS.LOGIN, { username, password });
      
      // Gérer le stockage des informations de connexion
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('unite', JSON.stringify(response.data.unite));
        localStorage.setItem('id_unite', response.data.unite.id);
      }
      
      return response;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('unite');
    localStorage.removeItem('id_unite');
    localStorage.removeItem('selectedUnite');
  },

  // Vérifier si l'utilisateur est connecté
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  // Récupérer les informations de l'unité connectée
  getCurrentUnite: () => {
    const unite = localStorage.getItem('unite');
    return unite ? JSON.parse(unite) : null;
  },

  // Récupérer l'ID de l'unité connectée
  getCurrentUniteId: () => {
    return localStorage.getItem('id_unite');
  },

  // Récupérer le nom de l'unité sélectionnée
  getSelectedUniteName: () => {
    return localStorage.getItem('selectedUnite');
  },

  // ===== NOUVELLES MÉTHODES POUR ENTRETIENS =====
  
  // Récupérer les entretiens par jour
  getEntretiensParJour: async (date) => {
    try {
      const response = await api.get(UNITES_ENDPOINTS.ENTRETIENS_JOUR, { day: date });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des entretiens par jour:', error);
      throw error;
    }
  },

  // Récupérer les entretiens par mois
  getEntretiensParMois: async (start, end) => {
    try {
      const response = await api.get(UNITES_ENDPOINTS.ENTRETIENS_MOIS, { start, end });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des entretiens par mois:', error);
      throw error;
    }
  },

  // Créer un entretien unité
  createUniteEntretien: async (entretienData) => {
    try {
      const response = await api.post(UNITES_ENDPOINTS.CREATE_ENTRETIEN, entretienData);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de l\'entretien:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'un entretien
  updateStatusUniteEntretien: async (idEntretien, newStatus) => {
    try {
      const response = await api.post(UNITES_ENDPOINTS.UPDATE_STATUS_ENTRETIEN, {
        id_unite_entretien: idEntretien,
        id_type_status_entretien: newStatus
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  },

  // Créer un score pour un entretien
  createScoreUniteEntretien: async (idEntretien, score) => {
    try {
      const response = await api.post(UNITES_ENDPOINTS.CREATE_SCORE_ENTRETIEN, {
        id_unite_entretien: idEntretien,
        score: score
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du score:', error);
      throw error;
    }
  },

  // ===== NOUVELLES MÉTHODES POUR SUGGESTIONS =====

  // Suggérer un candidat à la RH
  suggestToRh: async (idUniteEntretien, idCandidat) => {
    try {
      const response = await api.post(UNITES_ENDPOINTS.SUGGEST_TO_RH, {
        id_unite_entretien: idUniteEntretien,
        id_candidat: idCandidat
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la suggestion à la RH:', error);
      throw error;
    }
  },

  // Récupérer toutes les suggestions envoyées à la RH
  getAllRhSuggestions: async () => {
    try {
      const response = await api.get(UNITES_ENDPOINTS.GET_RH_SUGGESTIONS);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions RH:', error);
      throw error;
    }
  },

  // Récupérer les candidats éligibles pour suggestion
  getCandidatsEligiblesPourRh: async () => {
    try {
      const response = await api.get(UNITES_ENDPOINTS.CANDIDATS_ELIGIBLES);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des candidats éligibles:', error);
      throw error;
    }
  },
};

export default unitesService;