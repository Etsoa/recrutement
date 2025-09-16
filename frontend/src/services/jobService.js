// services/jobService.js - Service pour la gestion des offres d'emploi
import { api } from './api';

export const jobService = {
  // Récupérer toutes les offres d'emploi
  getAllJobs: async (params = {}) => {
    try {
      const data = await api.get('/jobs', params);
      return {
        success: true,
        jobs: data.jobs || [],
        message: data.message || 'Offres récupérées avec succès',
        total: data.total || 0,
        page: data.page || 1,
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      return {
        success: false,
        jobs: [],
        message: error.message || 'Erreur lors de la récupération des offres',
        error: error,
      };
    }
  },

  // Récupérer une offre par ID
  getJobById: async (jobId) => {
    try {
      const data = await api.get(`/jobs/${jobId}`);
      return {
        success: true,
        job: data.job || null,
        message: data.message || 'Offre récupérée avec succès',
      };
    } catch (error) {
      return {
        success: false,
        job: null,
        message: error.message || 'Erreur lors de la récupération de l\'offre',
        error: error,
      };
    }
  },

  // Créer une nouvelle offre d'emploi
  createJob: async (jobData) => {
    try {
      const data = await api.post('/jobs', jobData);
      return {
        success: true,
        job: data.job || null,
        message: data.message || 'Offre créée avec succès',
      };
    } catch (error) {
      return {
        success: false,
        job: null,
        message: error.message || 'Erreur lors de la création de l\'offre',
        error: error,
      };
    }
  },

  // Mettre à jour une offre d'emploi
  updateJob: async (jobId, jobData) => {
    try {
      const data = await api.put(`/jobs/${jobId}`, jobData);
      return {
        success: true,
        job: data.job || null,
        message: data.message || 'Offre mise à jour avec succès',
      };
    } catch (error) {
      return {
        success: false,
        job: null,
        message: error.message || 'Erreur lors de la mise à jour de l\'offre',
        error: error,
      };
    }
  },

  // Supprimer une offre d'emploi
  deleteJob: async (jobId) => {
    try {
      const data = await api.delete(`/jobs/${jobId}`);
      return {
        success: true,
        message: data.message || 'Offre supprimée avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la suppression de l\'offre',
        error: error,
      };
    }
  },

  // Rechercher des offres d'emploi
  searchJobs: async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters,
      };
      const data = await api.get('/jobs/search', params);
      return {
        success: true,
        jobs: data.jobs || [],
        message: data.message || 'Recherche effectuée avec succès',
        total: data.total || 0,
      };
    } catch (error) {
      return {
        success: false,
        jobs: [],
        message: error.message || 'Erreur lors de la recherche',
        error: error,
      };
    }
  },

  // Publier/Dépublier une offre
  toggleJobStatus: async (jobId, status) => {
    try {
      const data = await api.patch(`/jobs/${jobId}/status`, { status });
      return {
        success: true,
        job: data.job || null,
        message: data.message || 'Statut de l\'offre mis à jour',
      };
    } catch (error) {
      return {
        success: false,
        job: null,
        message: error.message || 'Erreur lors de la mise à jour du statut',
        error: error,
      };
    }
  },

  // Récupérer les candidatures pour une offre
  getJobApplications: async (jobId) => {
    try {
      const data = await api.get(`/jobs/${jobId}/applications`);
      return {
        success: true,
        applications: data.applications || [],
        message: data.message || 'Candidatures récupérées avec succès',
      };
    } catch (error) {
      return {
        success: false,
        applications: [],
        message: error.message || 'Erreur lors de la récupération des candidatures',
        error: error,
      };
    }
  },

  // Postuler à une offre
  applyToJob: async (jobId, applicationData) => {
    try {
      const data = await api.post(`/jobs/${jobId}/apply`, applicationData);
      return {
        success: true,
        application: data.application || null,
        message: data.message || 'Candidature envoyée avec succès',
      };
    } catch (error) {
      return {
        success: false,
        application: null,
        message: error.message || 'Erreur lors de l\'envoi de la candidature',
        error: error,
      };
    }
  },

  // Récupérer les statistiques des offres
  getJobStats: async () => {
    try {
      const data = await api.get('/jobs/stats');
      return {
        success: true,
        stats: data.stats || {},
        message: data.message || 'Statistiques récupérées avec succès',
      };
    } catch (error) {
      return {
        success: false,
        stats: {},
        message: error.message || 'Erreur lors de la récupération des statistiques',
        error: error,
      };
    }
  },
};

export default jobService;
