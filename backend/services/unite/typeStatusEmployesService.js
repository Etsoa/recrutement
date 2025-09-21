const TypeStatusEmploye = require('../../models/typeStatusEmployesModel');

const createTypeStatusEmploye = async (data) => {
    return await TypeStatusEmploye.create(data);
};

const getAllTypeStatusEmployes = async () => {
    return await TypeStatusEmploye.findAll();
};

const getTypeStatusEmployeById = async (id) => {
    return await TypeStatusEmploye.findByPk(id);
};

const updateTypeStatusEmploye = async (id, data) => {
    return await TypeStatusEmploye.update(data, { where: { id } });
};

const deleteTypeStatusEmploye = async (id) => {
    return await TypeStatusEmploye.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusEmploye,
    getAllTypeStatusEmployes,
    getTypeStatusEmployeById,
    updateTypeStatusEmploye,
    deleteTypeStatusEmploye
};