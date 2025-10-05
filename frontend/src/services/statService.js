// services/statService.js - Service pour la gestion des statistiques
import { api } from './api';

const STAT_ENDPOINTS = {
  STATISTIQUES: '/stat/getStatistique',
  STATISTIQUES_BY_UNITE: '/stat/getStatsByUnite',
  STATISTIQUES_RH: '/stat/getRhStats',
};

export const statService = {
  getAllStats: async (data) => {
    try {
      const response = await api.post(STAT_ENDPOINTS.STATISTIQUES, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  getStatsByUnite: async (id_unite, ageRange = {}) => {
    try {
      const response = await api.post(STAT_ENDPOINTS.STATISTIQUES_BY_UNITE, {
        id_unite,
        ...ageRange
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques par unité:', error);
      throw error;
    }
  },

  getRhStats: async (ageRange = {}) => {
    try {
      const response = await api.post(STAT_ENDPOINTS.STATISTIQUES_RH, ageRange);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques RH:', error);
      throw error;
    }
  }
};
  
export default statService;