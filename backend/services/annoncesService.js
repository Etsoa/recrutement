const db = require('../config/db');
const Annonces = require('../models/annoncesModel');

module.exports = {
  async getAllAnnoncesActives() {
    try {
      // Exemple: récupérer toutes les annonces actives
      const result = await Annonces.getAllActives(db);
      return result;
    } catch (error) {
      console.error('Erreur dans getAllAnnoncesActives:', error.message);
      throw new Error(`Erreur lors de la récupération des annonces actives: ${error.message}`);
    }
  },
  
  async getAnnonceCompleteById(id) {
    try {
      if (!id) {
        throw new Error('ID annonce requis');
      }
      
      // Exemple: récupérer une annonce complète par ID
      const result = await Annonces.getCompleteById(db, id);
      return result;
    } catch (error) {
      console.error('Erreur dans getAnnonceCompleteById:', error.message);
      throw new Error(`Erreur lors de la récupération de l'annonce: ${error.message}`);
    }
  }
};