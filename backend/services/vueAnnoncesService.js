// services/vueAnnoncesService.js
const VueAnnoncesComplete = require('../models/vueAnnoncesCompleteModel');

const getAllAnnonces = async () => {
    return await VueAnnoncesComplete.findAll();
};

const getAnnonceById = async (id) => {
    return await VueAnnoncesComplete.findOne({ where: { id_annonce: id } });
};

module.exports = {
    getAllAnnonces,
    getAnnonceById
};
