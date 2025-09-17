const TypeStatusEmployes = require('../models/typeStatusEmployesModel');

const createTypeStatusEmploye = async (data) => {
    return await TypeStatusEmployes.create(data);
};

const getAllTypeStatusEmployes = async () => {
    return await TypeStatusEmployes.findAll();
};

const getTypeStatusEmployeById = async (id) => {
    return await TypeStatusEmployes.findByPk(id);
};

const updateTypeStatusEmploye = async (id, data) => {
    return await TypeStatusEmployes.update(data, { where: { id } });
};

const deleteTypeStatusEmploye = async (id) => {
    return await TypeStatusEmployes.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusEmploye,
    getAllTypeStatusEmployes,
    getTypeStatusEmployeById,
    updateTypeStatusEmploye,
    deleteTypeStatusEmploye
};