const TypeStatusEntretiens = require('../models/typeStatusEntretiensModel');

const createTypeStatusEntretien = async (data) => {
    return await TypeStatusEntretiens.create(data);
};

const getAllTypeStatusEntretiens = async () => {
    return await TypeStatusEntretiens.findAll();
};

const getTypeStatusEntretienById = async (id) => {
    return await TypeStatusEntretiens.findByPk(id);
};

const updateTypeStatusEntretien = async (id, data) => {
    return await TypeStatusEntretiens.update(data, { where: { id } });
};

const deleteTypeStatusEntretien = async (id) => {
    return await TypeStatusEntretiens.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusEntretien,
    getAllTypeStatusEntretiens,
    getTypeStatusEntretienById,
    updateTypeStatusEntretien,
    deleteTypeStatusEntretien
};