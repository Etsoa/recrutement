// services/parametresService.js - Service spécifique pour la gestion des paramètres
import api from './api';

export const parametresService = {
  /**
   * Récupérer tous les paramètres de l'application
   * @returns {Promise} Tous les paramètres (genres, villes, domaines, etc.)
   */
  async getAllParametres() {
    try {
      const response = await api.parametres.getAll();
      // L'API retourne déjà la structure { success, data, message }
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Impossible de charger les paramètres'
      };
    }
  },

  /**
   * Formater les paramètres pour les dropdowns
   * @param {Array} items - Liste des items avec id et valeur
   * @returns {Array} Tableau formaté pour les dropdowns
   */
  formatForDropdown(items) {
    if (!Array.isArray(items)) return [];
    return items
      .filter(item => item && item.valeur) // Filtrer les items valides
      .map(item => ({
        value: item.valeur,
        label: item.valeur,
        id: item.id_genre || item.id_ville || item.id_filiere || item.id_niveau || 
            item.id_langue || item.id_qualite || item.id_domaine || item.id_poste || 
            item.id_situation
      }));
  },

  /**
   * Formater spécifiquement les genres pour les dropdowns
   * @param {Array} genres - Liste des genres
   * @returns {Array} Tableau formaté pour les dropdowns
   */
  formatGenres(genres) {
    return this.formatForDropdown(genres);
  },

  /**
   * Formater spécifiquement les villes pour les dropdowns
   * @param {Array} villes - Liste des villes
   * @returns {Array} Tableau formaté pour les dropdowns
   */
  formatVilles(villes) {
    return this.formatForDropdown(villes);
  },

  /**
   * Formater spécifiquement les situations matrimoniales pour les dropdowns
   * @param {Array} situations - Liste des situations matrimoniales
   * @returns {Array} Tableau formaté pour les dropdowns
   */
  formatSituationsMatrimoniales(situations) {
    return this.formatForDropdown(situations);
  },

  /**
   * Formater spécifiquement les filières pour les dropdowns
   * @param {Array} filieres - Liste des filières
   * @returns {Array} Tableau formaté pour les dropdowns
   */
  formatFilieres(filieres) {
    return this.formatForDropdown(filieres);
  },

  /**
   * Formater spécifiquement les niveaux pour les dropdowns
   * @param {Array} niveaux - Liste des niveaux
   * @returns {Array} Tableau formaté pour les dropdowns
   */
  formatNiveaux(niveaux) {
    return this.formatForDropdown(niveaux);
  },

  /**
   * Formater spécifiquement les langues pour les checkboxes
   * @param {Array} langues - Liste des langues
   * @returns {Array} Tableau formaté pour les checkboxes
   */
  formatLangues(langues) {
    return this.formatForDropdown(langues);
  },

  /**
   * Formater spécifiquement les qualités pour les checkboxes
   * @param {Array} qualites - Liste des qualités
   * @returns {Array} Tableau formaté pour les checkboxes
   */
  formatQualites(qualites) {
    return this.formatForDropdown(qualites);
  },

  /**
   * Formater spécifiquement les domaines pour les dropdowns
   * @param {Array} domaines - Liste des domaines
   * @returns {Array} Tableau formaté pour les dropdowns
   */
  formatDomaines(domaines) {
    return this.formatForDropdown(domaines);
  }
};

export default parametresService;