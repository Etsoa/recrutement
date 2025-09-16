const TypeStatusAnnonces = require('../models/typeStatusAnnoncesModel');

const createTypeStatusAnnonce = async (data) => {
    return await TypeStatusAnnonces.create(data);
};

const getAllTypeStatusAnnonces = async () => {
    return await TypeStatusAnnonces.findAll();
};

const getTypeStatusAnnonceById = async (id) => {
    return await TypeStatusAnnonces.findByPk(id);
};

const updateTypeStatusAnnonce = async (id, data) => {
    return await TypeStatusAnnonces.update(data, { where: { id } });
};

const deleteTypeStatusAnnonce = async (id) => {
    return await TypeStatusAnnonces.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusAnnonce,
    getAllTypeStatusAnnonces,
    getTypeStatusAnnonceById,
    updateTypeStatusAnnonce,
    deleteTypeStatusAnnonce
};