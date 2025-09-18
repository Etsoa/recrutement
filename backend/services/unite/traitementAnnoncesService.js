const Annonce = require('../../models/annoncesModel');
const Poste = require('../../models/postesModel');
const Ville = require('../../models/villesModel');
const Genre = require('../../models/genresModel');

/**
 * Récupère toutes les annonces avec leurs relations
 */
exports.getAllAnnonces = async () => {
  try {
    const annonces = await Annonce.findAll({
      include: [
        { model: Poste, attributes: ['valeur'] }, // ou 'nom_poste' selon ton schéma
        { model: Ville, attributes: ['valeur'] }, // ou 'nom_ville'
        { model: Genre, attributes: ['valeur'] }  // ou 'nom_genre'
      ],
      order: [['id_annonce', 'ASC']]
    });
    return annonces;
  } catch (err) {
    throw new Error('Erreur lors de la récupération des annonces : ' + err.message);
  }
};
