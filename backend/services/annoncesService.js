const Annonce = require('../models/annoncesModel');

const createAnnonce = async (data) => {
    return await Annonce.create(data);
};

const getAllAnnonces = async () => {
    return await Annonce.findAll();
};

const getAnnonceById = async (id) => {
    return await Annonce.findByPk(id);
};

const updateAnnonce = async (id, data) => {
    return await Annonce.update(data, { where: { id } });
};

const deleteAnnonce = async (id) => {
    return await Annonce.destroy({ where: { id } });
};

module.exports = {
    createAnnonce,
    getAllAnnonces,
    getAnnonceById,
    updateAnnonce,
    deleteAnnonce
};