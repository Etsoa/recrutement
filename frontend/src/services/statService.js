// services/parametresService.js - Service pour la gestion des paramètres
import { api } from './api';

const PARAMETRES_ENDPOINTS = {
  STATISTIQUES: '/stat/getStatistique',
};

export const parametresService = {
  getAllStats: async (data) => {
    try {
      const response = await api.post(PARAMETRES_ENDPOINTS.STATISTIQUES, data);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création du poste:', error);
      throw error;
    }
  }
};
  
export default parametresService;