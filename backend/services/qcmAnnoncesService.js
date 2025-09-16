const QcmAnnonces = require('../models/qcmAnnoncesModel');

const createQcmAnnonce = async (data) => {
    return await QcmAnnonces.create(data);
};

const getAllQcmAnnonces = async () => {
    return await QcmAnnonces.findAll();
};

const getQcmAnnonceById = async (id) => {
    return await QcmAnnonces.findByPk(id);
};

const updateQcmAnnonce = async (id, data) => {
    return await QcmAnnonces.update(data, { where: { id } });
};

const deleteQcmAnnonce = async (id) => {
    return await QcmAnnonces.destroy({ where: { id } });
};

module.exports = {
    createQcmAnnonce,
    getAllQcmAnnonces,
    getQcmAnnonceById,
    updateQcmAnnonce,
    deleteQcmAnnonce
};