// services/authService.js - Service pour l'authentification
import { api, authUtils } from './api';

export const authService = {
  // Connexion utilisateur
  login: async (credentials) => {
    try {
      const data = await api.post('/auth/login', credentials);
      
      if (data.token) {
        authUtils.setToken(data.token);
      }
      
      return {
        success: true,
        user: data.user || null,
        token: data.token || null,
        message: data.message || 'Connexion réussie',
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        token: null,
        message: error.message || 'Erreur lors de la connexion',
        error: error,
      };
    }
  },

  // Inscription utilisateur
  register: async (userData) => {
    try {
      const data = await api.post('/auth/register', userData);
      
      if (data.token) {
        authUtils.setToken(data.token);
      }
      
      return {
        success: true,
        user: data.user || null,
        token: data.token || null,
        message: data.message || 'Inscription réussie',
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        token: null,
        message: error.message || 'Erreur lors de l\'inscription',
        error: error,
      };
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.post('/auth/logout');
      authUtils.removeToken();
      
      return {
        success: true,
        message: 'Déconnexion réussie',
      };
    } catch (error) {
      // Même en cas d'erreur API, on supprime le token local
      authUtils.removeToken();
      
      return {
        success: true,
        message: 'Déconnexion effectuée',
      };
    }
  },

  // Vérifier le token
  verifyToken: async () => {
    try {
      const data = await api.get('/auth/verify');
      
      return {
        success: true,
        user: data.user || null,
        message: data.message || 'Token valide',
      };
    } catch (error) {
      authUtils.removeToken();
      
      return {
        success: false,
        user: null,
        message: error.message || 'Token invalide',
        error: error,
      };
    }
  },

  // Récupérer le profil utilisateur connecté
  getProfile: async () => {
    try {
      const data = await api.get('/auth/profile');
      
      return {
        success: true,
        user: data.user || null,
        message: data.message || 'Profil récupéré avec succès',
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        message: error.message || 'Erreur lors de la récupération du profil',
        error: error,
      };
    }
  },

  // Mettre à jour le profil
  updateProfile: async (profileData) => {
    try {
      const data = await api.put('/auth/profile', profileData);
      
      return {
        success: true,
        user: data.user || null,
        message: data.message || 'Profil mis à jour avec succès',
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        message: error.message || 'Erreur lors de la mise à jour du profil',
        error: error,
      };
    }
  },

  // Mot de passe oublié
  forgotPassword: async (email) => {
    try {
      const data = await api.post('/auth/forgot-password', { email });
      
      return {
        success: true,
        message: data.message || 'Email de récupération envoyé',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de l\'envoi de l\'email',
        error: error,
      };
    }
  },

  // Réinitialiser le mot de passe
  resetPassword: async (token, newPassword) => {
    try {
      const data = await api.post('/auth/reset-password', { token, newPassword });
      
      return {
        success: true,
        message: data.message || 'Mot de passe réinitialisé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la réinitialisation',
        error: error,
      };
    }
  },

  // Changer le mot de passe
  changePassword: async (currentPassword, newPassword) => {
    try {
      const data = await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      
      return {
        success: true,
        message: data.message || 'Mot de passe changé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors du changement de mot de passe',
        error: error,
      };
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return authUtils.isAuthenticated();
  },

  // Récupérer le token actuel
  getToken: () => {
    return authUtils.getToken();
  },
};

export default authService;
