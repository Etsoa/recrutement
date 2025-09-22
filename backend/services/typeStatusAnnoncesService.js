const TypeStatusAnnonce = require('../models/typeStatusAnnoncesModel');

const createTypeStatusAnnonce = async (data) => {
    return await TypeStatusAnnonce.create(data);
};

const getAllTypeStatusAnnonces = async () => {
    return await TypeStatusAnnonce.findAll();
};

const getTypeStatusAnnonceById = async (id) => {
    return await TypeStatusAnnonce.findByPk(id);
};

const updateTypeStatusAnnonce = async (id, data) => {
    return await TypeStatusAnnonce.update(data, { where: { id } });
};

const deleteTypeStatusAnnonce = async (id) => {
    return await TypeStatusAnnonce.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusAnnonce,
    getAllTypeStatusAnnonces,
    getTypeStatusAnnonceById,
    updateTypeStatusAnnonce,
    deleteTypeStatusAnnonce
};