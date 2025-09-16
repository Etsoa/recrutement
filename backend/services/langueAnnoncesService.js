const LangueAnnonces = require('../models/langueAnnoncesModel');

const createLangueAnnonce = async (data) => {
    return await LangueAnnonces.create(data);
};

const getAllLangueAnnonces = async () => {
    return await LangueAnnonces.findAll();
};

const getLangueAnnonceById = async (id) => {
    return await LangueAnnonces.findByPk(id);
};

const updateLangueAnnonce = async (id, data) => {
    return await LangueAnnonces.update(data, { where: { id } });
};

const deleteLangueAnnonce = async (id) => {
    return await LangueAnnonces.destroy({ where: { id } });
};

module.exports = {
    createLangueAnnonce,
    getAllLangueAnnonces,
    getLangueAnnonceById,
    updateLangueAnnonce,
    deleteLangueAnnonce
};