const TypeStatusEntretien = require('../../models/typeStatusEntretiensModel');

const createTypeStatusEntretien = async (data) => {
    return await TypeStatusEntretien.create(data);
};

const getAllTypeStatusEntretiens = async () => {
    return await TypeStatusEntretien.findAll();
};

const getTypeStatusEntretienById = async (id) => {
    return await TypeStatusEntretien.findByPk(id);
};

const updateTypeStatusEntretien = async (id, data) => {
    return await TypeStatusEntretien.update(data, { where: { id } });
};

const deleteTypeStatusEntretien = async (id) => {
    return await TypeStatusEntretien.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusEntretien,
    getAllTypeStatusEntretiens,
    getTypeStatusEntretienById,
    updateTypeStatusEntretien,
    deleteTypeStatusEntretien
};