import { api } from './api';

export const annonceService = {
    getAllAnnonces: async (params = {}) => {
        try {
            // Appel API en utilisant seulement l'endpoint (sans /api car c'est déjà dans API_BASE_URL)
            const data = await api.get('/unite/annonces', params);
            
            // Transformation des données pour correspondre au format attendu par AnnonceList
            // Le backend renvoie les données dans data.data (tableau d'annonces)
            const formattedAnnonces = Array.isArray(data.data) ? data.data.map(annonce => ({
                id: annonce.id_annonce,
                poste: annonce.Poste?.valeur || 'Poste non défini',
                genre: annonce.Genre?.valeur || 'Non spécifié',
                ageMin: annonce.age_min || 0,
                ageMax: annonce.age_max || 0,
                ville: annonce.Ville?.valeur || 'Ville non définie'
            })) : [];

            return {
                success: data.success,
                annonces: formattedAnnonces,
                message: data.message,
                total: formattedAnnonces.length,
                page: 1,
                totalPages: 1,
            };
        } catch (error) {
            console.error('Erreur annonceService:', error);
            return {
                success: false,
                annonces: [],
                message: error.message || 'Erreur lors de la récupération des annonces',
                error: error,
            };
        }
    },

    // Fonction pour paginer les annonces côté frontend
    getPaginatedAnnonces: async (page = 1, itemsPerPage = 8, params = {}) => {
        try {
            // Récupérer toutes les annonces
            const response = await annonceService.getAllAnnonces(params);
            
            if (!response.success) {
                return response;
            }

            const allAnnonces = response.annonces;
            const total = allAnnonces.length;
            const totalPages = Math.ceil(total / itemsPerPage);
            
            // Calcul de la pagination
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedAnnonces = allAnnonces.slice(startIndex, endIndex);

            return {
                success: true,
                annonces: paginatedAnnonces,
                message: response.message,
                total: total,
                page: page,
                totalPages: totalPages,
                itemsPerPage: itemsPerPage,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            };
        } catch (error) {
            console.error('Erreur getPaginatedAnnonces:', error);
            return {
                success: false,
                annonces: [],
                message: error.message || 'Erreur lors de la récupération des annonces paginées',
                error: error,
            };
        }
    },

    // Fonction pour récupérer les détails d'une annonce par ID
    getAnnonceById: async (id) => {
        try {
            const data = await api.get('/unite/annonce', {id: id});
            
            return {
                success: data.success,
                data: data.data,
                message: data.message,
            };
        } catch (error) {
            console.error('Erreur getAnnonceById:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Erreur lors de la récupération des détails de l\'annonce',
                error: error,
            };
        }
    },
}