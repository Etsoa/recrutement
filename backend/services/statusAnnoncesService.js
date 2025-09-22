const StatusAnnonce = require('../models/statusAnnoncesModel');

const createStatusAnnonce = async (data) => {
    return await StatusAnnonce.create(data);
};

const getAllStatusAnnonces = async () => {
    return await StatusAnnonce.findAll();
};

const getStatusAnnonceById = async (id) => {
    return await StatusAnnonce.findByPk(id);
};

const updateStatusAnnonce = async (id, data) => {
    return await StatusAnnonce.update(data, { where: { id } });
};

const deleteStatusAnnonce = async (id) => {
    return await StatusAnnonce.destroy({ where: { id } });
};

module.exports = {
    createStatusAnnonce,
    getAllStatusAnnonces,
    getStatusAnnonceById,
    updateStatusAnnonce,
    deleteStatusAnnonce
};