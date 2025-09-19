// services/annoncesService.js - Service spécifique pour la gestion des annonces
import api from './api';

export const annoncesService = {
  /**
   * Récupérer toutes les annonces actives
   * @returns {Promise} Liste des annonces avec leurs détails
   */
  async getAllAnnonces() {
    try {
      const response = await api.annonces.getAll();
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces:', error);
      throw new Error(`Impossible de charger les annonces: ${error.message}`);
    }
  },

  /**
   * Récupérer une annonce par son ID
   * @param {number} id - ID de l'annonce
   * @returns {Promise} Détails de l'annonce
   */
  async getAnnonceById(id) {
    try {
      if (!id) {
        throw new Error('ID de l\'annonce requis');
      }
      
      const response = await api.annonces.getById(id);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'annonce:', error);
      throw new Error(`Impossible de charger l'annonce: ${error.message}`);
    }
  },

  /**
   * Créer une candidature pour une annonce
   * @param {Object} candidatData - Données du candidat
   * @returns {Promise} Résultat de la création
   */
  async createCandidature(candidatData) {
    try {
      // Validation des données obligatoires
      const requiredFields = ['nom', 'prenom', 'email', 'contact', 'cin', 'id_annonce'];
      const missingFields = requiredFields.filter(field => !candidatData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
      }

      const response = await api.annonces.createCandidat(candidatData);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la candidature:', error);
      throw new Error(`Impossible de soumettre la candidature: ${error.message}`);
    }
  },

  /**
   * Formater les données d'annonce pour l'affichage
   * @param {Object} annonce - Données brutes de l'annonce
   * @returns {Object} Annonce formatée
   */
  formatAnnonceForDisplay(annonce) {
    if (!annonce) return null;

    return {
      ...annonce,
      ageRange: `${annonce.age_min} - ${annonce.age_max} ans`,
      location: annonce.Ville?.valeur || 'Non spécifiée',
      position: annonce.Poste?.valeur || 'Poste non défini',
      gender: annonce.Genre?.valeur || 'Non spécifié',
      
      // Formater les exigences
      formations: annonce.NiveauFiliereAnnonces?.map(nfa => ({
        filiere: nfa.Filiere?.valeur,
        niveau: nfa.Niveau?.valeur
      })) || [],
      
      langues: annonce.LangueAnnonces?.map(la => 
        la.Langue?.valeur
      ) || [],
      
      qualites: annonce.QualiteAnnonces?.map(qa => 
        qa.Qualite?.valeur
      ) || [],
      
      experiences: annonce.ExperienceAnnonces?.map(ea => ({
        domaine: ea.Domaine?.valeur,
        duree: ea.nombre_annee
      })) || []
    };
  },

  /**
   * Filtrer les annonces selon des critères
   * @param {Array} annonces - Liste des annonces
   * @param {Object} filters - Critères de filtrage
   * @returns {Array} Annonces filtrées
   */
  filterAnnonces(annonces, filters = {}) {
    if (!annonces || !Array.isArray(annonces)) return [];

    return annonces.filter(annonce => {
      // Filtre par ville
      if (filters.ville && annonce.Ville?.valeur !== filters.ville) {
        return false;
      }

      // Filtre par poste (recherche partielle insensible à la casse)
      if (filters.poste) {
        const posteSearch = filters.poste.toLowerCase();
        const posteAnnonce = (annonce.Poste?.valeur || '').toLowerCase();
        if (!posteAnnonce.includes(posteSearch)) {
          return false;
        }
      }

      // Filtre par âge
      if (filters.age) {
        if (filters.age < annonce.age_min || filters.age > annonce.age_max) {
          return false;
        }
      }

      return true;
    });
  }
};

export default annoncesService;