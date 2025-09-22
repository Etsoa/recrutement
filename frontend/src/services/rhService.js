
// services/rhService.js - Service pour la gestion RH
import { api } from './api';

const RH_ENDPOINTS = {
  LOGIN: '/rh/',
  FORM_ANNONCE: '/rh/form-annonce',
  CREATE_ANNONCE: '/rh/create/annonce',
  SUGGESTIONS: '/rh/suggestions',
  CREATE_ENTRETIEN: '/rh/create/rh_entretien',
  UPDATE_STATUS_SUGGESTION: '/rh/suggestion/status',
  ENTRETIENS_JOUR: '/rh/rh_entretiens_jour',
  ALL_ANNONCES: '/rh/annonces',
  UPDATE_ANNONCE_STATUS: '/rh/annonce/status',
  ENTRETIENS_MOIS: '/rh/rh_entretiens_mois',
  UPDATE_DATE_ENTRETIEN: '/rh/update/date/rh_entretien',
  UPDATE_STATUS_ENTRETIEN: '/rh/update/status/rh_entretien',
  DISPONIBILITES: '/rh/disponibilites/rh',
  PROCHAINE_DISPONIBILITE: '/rh/prochaine_disponibilite/rh',
  RESERVE_ENTRETIEN: '/rh/reserve/rh_entretien',
  CREATE_SCORE: '/rh/create/score/rh_entretien',
  SUGGEST_TO_CEO: '/rh/suggest/ceo',
  CEO_SUGGESTIONS: '/rh/suggest/'
};

export const rhService = {
  // Connexion RH
  login: async (email, password) => {
    try {
      const response = await api.post(RH_ENDPOINTS.LOGIN, { email, password });
      return response;
    } catch (error) {
      console.error('Erreur lors de la connexion RH:', error);
      throw error;
    }
  },

  // Récupérer les données du formulaire d'annonce
  getFormAnnonceData: async () => {
    try {
      const response = await api.get(RH_ENDPOINTS.FORM_ANNONCE);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du formulaire:', error);
      throw error;
    }
  },

  // Créer une annonce
  createAnnonce: async (annonceData) => {
    try {
      const response = await api.get(RH_ENDPOINTS.CREATE_ANNONCE, annonceData);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
      throw error;
    }
  },

  // Récupérer les suggestions
  getSuggestions: async () => {
    try {
      const response = await api.get(RH_ENDPOINTS.SUGGESTIONS);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
      throw error;
    }
  },

  // Créer un entretien RH
  createRhEntretien: async (data) => {
    try {
      const response = await api.post(RH_ENDPOINTS.CREATE_ENTRETIEN, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de l\'entretien RH:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une suggestion RH
  updateStatusSuggestion: async (data) => {
    try {
      // Vérifier les conflits d'entretien si nécessaire
      if (data.date_entretien && data.id_rh) {
        const entretiens = await rhService.getEntretiensParJour(data.date_entretien);
        const dejaPris = entretiens.some(e => e.id_rh === data.id_rh);
        if (dejaPris) {
          return { 
            success: false, 
            message: "Un entretien est déjà prévu pour ce RH à cette date." 
          };
        }
      }
      
      const response = await api.post(RH_ENDPOINTS.UPDATE_STATUS_SUGGESTION, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de suggestion:', error);
      throw error;
    }
  },

  // Récupérer les entretiens par jour
  getEntretiensParJour: async (date) => {
    try {
      const response = await api.get(RH_ENDPOINTS.ENTRETIENS_JOUR, { day: date });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des entretiens par jour:', error);
      throw error;
    }
  },

  // Récupérer toutes les annonces
  getAllAnnonces: async () => {
    try {
      const response = await api.get(RH_ENDPOINTS.ALL_ANNONCES);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une annonce
  updateAnnonceStatus: async (data) => {
    try {
      const response = await api.post(RH_ENDPOINTS.UPDATE_ANNONCE_STATUS, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut d\'annonce:', error);
      throw error;
    }
  },

  // Récupérer les entretiens par mois
  getEntretiensParMois: async (start, end) => {
    try {
      const response = await api.get(RH_ENDPOINTS.ENTRETIENS_MOIS, { start, end });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des entretiens par mois:', error);
      throw error;
    }
  },

  // Mettre à jour la date d'un entretien
  updateDateEntretien: async (id_rh_entretien, nouvelle_date) => {
    try {
      const response = await api.post(RH_ENDPOINTS.UPDATE_DATE_ENTRETIEN, {
        id_rh_entretien,
        nouvelle_date
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la date d\'entretien:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'un entretien
  updateStatusEntretien: async (id_rh_entretien, id_type_status_entretien) => {
    try {
      const response = await api.post(RH_ENDPOINTS.UPDATE_STATUS_ENTRETIEN, {
        id_rh_entretien,
        id_type_status_entretien
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut d\'entretien:', error);
      throw error;
    }
  },

  // Récupérer les disponibilités
  getDisponibilites: async (id_rh, date) => {
    try {
      const response = await api.post(RH_ENDPOINTS.DISPONIBILITES, { id_rh, date });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des disponibilités:', error);
      throw error;
    }
  },

  // Récupérer la prochaine disponibilité
  getProchaineDisponibilite: async (id_rh, date_depart) => {
    try {
      const response = await api.post(RH_ENDPOINTS.PROCHAINE_DISPONIBILITE, {
        id_rh,
        date_depart
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de la prochaine disponibilité:', error);
      throw error;
    }
  },

  // Réserver un entretien
  reserveEntretien: async (data) => {
    try {
      const response = await api.post(RH_ENDPOINTS.RESERVE_ENTRETIEN, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la réservation de l\'entretien:', error);
      throw error;
    }
  },

  // Créer un score
  createScore: async (data) => {
    try {
      const response = await api.post(RH_ENDPOINTS.CREATE_SCORE, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du score:', error);
      throw error;
    }
  },

  // Suggérer au CEO
  suggestToCeo: async (data) => {
    try {
      const response = await api.post(RH_ENDPOINTS.SUGGEST_TO_CEO, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la suggestion au CEO:', error);
      throw error;
    }
  },

  // Récupérer les suggestions CEO
  getCeoSuggestions: async () => {
    try {
      const response = await api.get(RH_ENDPOINTS.CEO_SUGGESTIONS);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions CEO:', error);
      throw error;
    }
  }
};

export default rhService;
