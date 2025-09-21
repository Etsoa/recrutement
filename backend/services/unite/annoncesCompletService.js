const AnnonceComplet = require('../../models/annoncesCompletModel');


// Récupérer toutes les annonces
const getAll = async () => {
  return await AnnonceComplet.findAll();
}

// Récupérer une annonce par ID
const getById = async (id) => {
  return await AnnonceComplet.findOne({ where: { id_annonce: id } });
}

module.exports = {
  getAll,
  getById
}