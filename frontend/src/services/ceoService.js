/**
 * Service pour gérer les fonctionnalités CEO
 */
import { api } from './api';

const CEO_ENDPOINTS = {
  LOGIN: '/ceo/',
  EMPLOYES: '/ceo/employes',
  EMPLOYES_DETAIL: '/ceo/employes/',
  SUGGESTIONS: '/ceo/suggestions',
  SUGGESTIONS_WAITING: '/ceo/suggestions-waiting',
  VALIDATE_SUGGESTION: '/ceo/validate-suggestion',
  REJECT_SUGGESTION: '/ceo/reject-suggestion',
  EMP_CONTRAT_ESSAI: '/ceo/emp-contrat-essai',
  RENOUVELER_CONTRAT: '/ceo/renouveler-contrat'
};

export const ceoService = {
  // Connexion CEO
  login: async (email, mot_de_passe) => {
    try {
      const response = await api.post(CEO_ENDPOINTS.LOGIN, { email, mot_de_passe });
      
      // Gérer le stockage des informations de connexion
      if (response.success) {
        localStorage.setItem('ceoToken', response.data.token);
        localStorage.setItem('ceo', JSON.stringify(response.data.ceo || {}));
      }
      
      return response;
    } catch (error) {
      console.error('Erreur lors de la connexion CEO:', error);
      return { success: false, message: "Erreur de connexion", error: error.message };
    }
  },

  // Vérifier l'authentification
  isLoggedIn: () => {
    return !!localStorage.getItem('ceoToken');
  },
  
  // Déconnecter le CEO
  logout: () => {
    localStorage.removeItem('ceoToken');
    localStorage.removeItem('ceo');
  },
  
  // Récupérer le token 
  getToken: () => {
    return localStorage.getItem('ceoToken');
  },
  
  // Récupérer le CEO connecté
  getCurrentCeo: () => {
    const ceo = localStorage.getItem('ceo');
    return ceo ? JSON.parse(ceo) : null;
  },
  
  // Récupérer tous les employés
  getAllEmployes: async () => {
    try {
      const response = await api.get(CEO_ENDPOINTS.EMPLOYES);
      return response;
    } catch (error) {
      console.error('Erreur getAllEmployes:', error);
      return { success: false, message: error.message, data: [] };
    }
  },
  
  // Récupérer les détails d'un employé
  getEmployeDetails: async (employeId) => {
    try {
      const response = await api.get(`${CEO_ENDPOINTS.EMPLOYES_DETAIL}${employeId}`);
      return response;
    } catch (error) {
      console.error('Erreur getEmployeDetails:', error);
      return { success: false, message: error.message, data: null };
    }
  },
  
  // Récupérer toutes les suggestions
  getAllSuggestions: async () => {
    try {
      const response = await api.get(CEO_ENDPOINTS.SUGGESTIONS);
      return response;
    } catch (error) {
      console.error('Erreur getAllSuggestions:', error);
      return { success: false, message: error.message, data: [] };
    }
  },
  
  // Récupérer les suggestions en attente
  getSuggestionsEnAttente: async () => {
    try {
      const response = await api.get(CEO_ENDPOINTS.SUGGESTIONS_WAITING);
      return response;
    } catch (error) {
      console.error('Erreur getSuggestionsEnAttente:', error);
      return { success: false, message: "Erreur lors de la récupération des suggestions en attente", error: error.message };
    }
  },

  // Accepter une suggestion
  accepterSuggestion: async (suggestionId) => {
    try {
      const response = await api.post(CEO_ENDPOINTS.VALIDATE_SUGGESTION, { id_suggestion: suggestionId });
      return response;
    } catch (error) {
      console.error('Erreur accepterSuggestion:', error);
      return { success: false, message: "Erreur lors de la validation de la suggestion", error: error.message };
    }
  },

  // Refuser une suggestion
  refuserSuggestion: async (suggestionId) => {
    try {
      const response = await api.post(CEO_ENDPOINTS.REJECT_SUGGESTION, { id_suggestion: suggestionId });
      return response;
    } catch (error) {
      console.error('Erreur refuserSuggestion:', error);
      return { success: false, message: "Erreur lors du rejet de la suggestion", error: error.message };
    }
  },

  // Obtenir les employés en contrat d'essai
  getEmpEnContratDEssai: async () => {
    try {
      const response = await api.get(CEO_ENDPOINTS.EMP_CONTRAT_ESSAI);
      return response;
    } catch (error) {
      console.error('Erreur getEmpEnContratDEssai:', error);
      return { success: false, message: error.message, data: [] };
    }
  },

  // Renouveler un contrat
  renewContract: async (contratId, dureeRenouvelement) => {
    try {
      const response = await api.post(CEO_ENDPOINTS.RENOUVELER_CONTRAT, { 
        id_contrat: contratId, 
        duree_mois: dureeRenouvelement 
      });
      return response;
    } catch (error) {
      console.error('Erreur renewContract:', error);
      return { success: false, message: "Erreur lors du renouvellement du contrat", error: error.message };
    }
  }
};

export default ceoService;
