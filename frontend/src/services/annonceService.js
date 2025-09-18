import { api } from './api';

export const annonceService = {
    getAllAnnonces: async (params = {}) => {
        try {
            const data = await api.get('/api/unite/annonces', params);
            return {
                success: true,
                annonces: data.annonces || [],
                message: data.message || 'Annonces récupérées avec succès',
                total: data.total || 0,
                page: data.page || 1,
                totalPages: data.totalPages || 1,
            };
        } catch (error) {
            return {
                success: false,
                users: [],
                message: error.message || 'Erreur lors de la récupération des annonces',
                error: error,
            };
        }
    },
}