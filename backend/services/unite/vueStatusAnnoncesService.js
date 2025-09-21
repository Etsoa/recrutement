// services/vueStatusAnnoncesService.js
const VueStatusAnnonces = require('../../models/vueStatusAnnoncesModel');

// Récupérer toutes les lignes
const getAllStatusAnnonces = async () => {
    return await VueStatusAnnonces.findAll();
};

// Récupérer une ligne par id_status_annonce
const getStatusAnnonceById = async (id) => {
    return await VueStatusAnnonces.findOne({ where: { id_status_annonce: id } });
};

const getStatusAnnoncesByAnnonceId = async (id_annonce) => {
    return await VueStatusAnnonces.findAll({ where: { id_annonce } });
};

module.exports = {
    getAllStatusAnnonces,
    getStatusAnnonceById,
    getStatusAnnoncesByAnnonceId
};
