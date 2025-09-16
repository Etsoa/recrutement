const StatusAnnonces = require('../models/statusAnnoncesModel');

const createStatusAnnonce = async (data) => {
    return await StatusAnnonces.create(data);
};

const getAllStatusAnnonces = async () => {
    return await StatusAnnonces.findAll();
};

const getStatusAnnonceById = async (id) => {
    return await StatusAnnonces.findByPk(id);
};

const updateStatusAnnonce = async (id, data) => {
    return await StatusAnnonces.update(data, { where: { id } });
};

const deleteStatusAnnonce = async (id) => {
    return await StatusAnnonces.destroy({ where: { id } });
};

module.exports = {
    createStatusAnnonce,
    getAllStatusAnnonces,
    getStatusAnnonceById,
    updateStatusAnnonce,
    deleteStatusAnnonce
};