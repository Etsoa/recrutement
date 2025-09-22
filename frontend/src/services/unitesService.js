// services/unitesService.js - Service pour la gestion des unités
import { api } from './api';

const UNITES_ENDPOINTS = {
  ALL: '/unite/',
  LOGIN: '/unite/login',
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
};

export default unitesService;