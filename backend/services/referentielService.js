// services/referentielService.js - Service pour les données de référence
const Ville = require('../models/villesModel');
const Genre = require('../models/genresModel');

/**
 * Récupérer toutes les villes
 */
exports.getAllVilles = async () => {
  try {
    const villes = await Ville.findAll({
      attributes: ['id_ville', 'valeur'],
      order: [['valeur', 'ASC']]
    });
    return villes;
  } catch (err) {
    throw new Error('Erreur lors de la récupération des villes : ' + err.message);
  }
};

/**
 * Récupérer tous les genres
 */
exports.getAllGenres = async () => {
  try {
    const genres = await Genre.findAll({
      attributes: ['id_genre', 'valeur'],
      order: [['valeur', 'ASC']]
    });
    return genres;
  } catch (err) {
    throw new Error('Erreur lors de la récupération des genres : ' + err.message);
  }
};
