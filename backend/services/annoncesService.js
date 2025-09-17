const Annonces = require('../models/annoncesModel');

const createAnnonce = async (data) => {
    return await Annonces.create(data);
};

const getAllAnnonces = async () => {
    return await Annonces.findAll();
};

const getAnnonceById = async (id) => {
    return await Annonces.findByPk(id);
};

const updateAnnonce = async (id, data) => {
    return await Annonces.update(data, { where: { id } });
};

const deleteAnnonce = async (id) => {
    return await Annonces.destroy({ where: { id } });
};

module.exports = {
    createAnnonce,
    getAllAnnonces,
    getAnnonceById,
    updateAnnonce,
    deleteAnnonce
};