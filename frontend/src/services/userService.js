// services/userService.js - Service pour la gestion des utilisateurs
import { api } from './api';

export const userService = {
  // Récupérer tous les utilisateurs
  getAllUsers: async (params = {}) => {
    try {
      const data = await api.get('/users', params);
      return {
        success: true,
        users: data.users || [],
        message: data.message || 'Utilisateurs récupérés avec succès',
        total: data.total || 0,
        page: data.page || 1,
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      return {
        success: false,
        users: [],
        message: error.message || 'Erreur lors de la récupération des utilisateurs',
        error: error,
      };
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (userId) => {
    try {
      const data = await api.get(`/users/${userId}`);
      return {
        success: true,
        user: data.user || null,
        message: data.message || 'Utilisateur récupéré avec succès',
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        message: error.message || 'Erreur lors de la récupération de l\'utilisateur',
        error: error,
      };
    }
  },

  // Créer un nouvel utilisateur
  createUser: async (userData) => {
    try {
      const data = await api.post('/users', userData);
      return {
        success: true,
        user: data.user || null,
        message: data.message || 'Utilisateur créé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        message: error.message || 'Erreur lors de la création de l\'utilisateur',
        error: error,
      };
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (userId, userData) => {
    try {
      const data = await api.put(`/users/${userId}`, userData);
      return {
        success: true,
        user: data.user || null,
        message: data.message || 'Utilisateur mis à jour avec succès',
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        message: error.message || 'Erreur lors de la mise à jour de l\'utilisateur',
        error: error,
      };
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (userId) => {
    try {
      const data = await api.delete(`/users/${userId}`);
      return {
        success: true,
        message: data.message || 'Utilisateur supprimé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la suppression de l\'utilisateur',
        error: error,
      };
    }
  },

  // Rechercher des utilisateurs
  searchUsers: async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters,
      };
      const data = await api.get('/users/search', params);
      return {
        success: true,
        users: data.users || [],
        message: data.message || 'Recherche effectuée avec succès',
        total: data.total || 0,
      };
    } catch (error) {
      return {
        success: false,
        users: [],
        message: error.message || 'Erreur lors de la recherche',
        error: error,
      };
    }
  },

  // Uploader une photo de profil
  uploadProfilePicture: async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const data = await api.upload(`/users/${userId}/profile-picture`, formData);
      return {
        success: true,
        imageUrl: data.imageUrl || null,
        message: data.message || 'Photo de profil mise à jour avec succès',
      };
    } catch (error) {
      return {
        success: false,
        imageUrl: null,
        message: error.message || 'Erreur lors du téléchargement de la photo',
        error: error,
      };
    }
  },
};

export default userService;
