// services/cvService.js - Service pour la gestion des CVs
import { api } from './api';

export const cvService = {
  // Récupérer tous les CVs
  getAllCVs: async (params = {}) => {
    try {
      const data = await api.get('/cvs', params);
      return {
        success: true,
        cvs: data.cvs || [],
        message: data.message || 'CVs récupérés avec succès',
        total: data.total || 0,
        page: data.page || 1,
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      return {
        success: false,
        cvs: [],
        message: error.message || 'Erreur lors de la récupération des CVs',
        error: error,
      };
    }
  },

  // Récupérer un CV par ID
  getCVById: async (cvId) => {
    try {
      const data = await api.get(`/cvs/${cvId}`);
      return {
        success: true,
        cv: data.cv || null,
        message: data.message || 'CV récupéré avec succès',
      };
    } catch (error) {
      return {
        success: false,
        cv: null,
        message: error.message || 'Erreur lors de la récupération du CV',
        error: error,
      };
    }
  },

  // Créer un nouveau CV
  createCV: async (cvData) => {
    try {
      const data = await api.post('/cvs', cvData);
      return {
        success: true,
        cv: data.cv || null,
        message: data.message || 'CV créé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        cv: null,
        message: error.message || 'Erreur lors de la création du CV',
        error: error,
      };
    }
  },

  // Mettre à jour un CV
  updateCV: async (cvId, cvData) => {
    try {
      const data = await api.put(`/cvs/${cvId}`, cvData);
      return {
        success: true,
        cv: data.cv || null,
        message: data.message || 'CV mis à jour avec succès',
      };
    } catch (error) {
      return {
        success: false,
        cv: null,
        message: error.message || 'Erreur lors de la mise à jour du CV',
        error: error,
      };
    }
  },

  // Supprimer un CV
  deleteCV: async (cvId) => {
    try {
      const data = await api.delete(`/cvs/${cvId}`);
      return {
        success: true,
        message: data.message || 'CV supprimé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la suppression du CV',
        error: error,
      };
    }
  },

  // Rechercher des CVs
  searchCVs: async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters,
      };
      const data = await api.get('/cvs/search', params);
      return {
        success: true,
        cvs: data.cvs || [],
        message: data.message || 'Recherche effectuée avec succès',
        total: data.total || 0,
      };
    } catch (error) {
      return {
        success: false,
        cvs: [],
        message: error.message || 'Erreur lors de la recherche',
        error: error,
      };
    }
  },

  // Uploader un CV (fichier PDF)
  uploadCV: async (file, metadata = {}) => {
    try {
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('metadata', JSON.stringify(metadata));
      
      const data = await api.upload('/cvs/upload', formData);
      return {
        success: true,
        cv: data.cv || null,
        fileUrl: data.fileUrl || null,
        message: data.message || 'CV téléchargé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        cv: null,
        fileUrl: null,
        message: error.message || 'Erreur lors du téléchargement du CV',
        error: error,
      };
    }
  },

  // Télécharger un CV
  downloadCV: async (cvId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cvs/${cvId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement');
      }
      
      const blob = await response.blob();
      return {
        success: true,
        blob: blob,
        message: 'CV téléchargé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        blob: null,
        message: error.message || 'Erreur lors du téléchargement du CV',
        error: error,
      };
    }
  },

  // Analyser un CV avec IA (fonctionnalité future)
  analyzeCV: async (cvId) => {
    try {
      const data = await api.post(`/cvs/${cvId}/analyze`);
      return {
        success: true,
        analysis: data.analysis || null,
        skills: data.skills || [],
        experience: data.experience || [],
        message: data.message || 'CV analysé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        analysis: null,
        skills: [],
        experience: [],
        message: error.message || 'Erreur lors de l\'analyse du CV',
        error: error,
      };
    }
  },

  // Comparer des CVs
  compareCVs: async (cvIds) => {
    try {
      const data = await api.post('/cvs/compare', { cvIds });
      return {
        success: true,
        comparison: data.comparison || null,
        message: data.message || 'Comparaison effectuée avec succès',
      };
    } catch (error) {
      return {
        success: false,
        comparison: null,
        message: error.message || 'Erreur lors de la comparaison',
        error: error,
      };
    }
  },
};

export default cvService;
