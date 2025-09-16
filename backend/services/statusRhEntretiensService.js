const StatusRhEntretiens = require('../models/statusRhEntretiensModel');

const createStatusRhEntretien = async (data) => {
    return await StatusRhEntretiens.create(data);
};

const getAllStatusRhEntretiens = async () => {
    return await StatusRhEntretiens.findAll();
};

const getStatusRhEntretienById = async (id) => {
    return await StatusRhEntretiens.findByPk(id);
};

const updateStatusRhEntretien = async (id, data) => {
    return await StatusRhEntretiens.update(data, { where: { id } });
};

const deleteStatusRhEntretien = async (id) => {
    return await StatusRhEntretiens.destroy({ where: { id } });
};

module.exports = {
    createStatusRhEntretien,
    getAllStatusRhEntretiens,
    getStatusRhEntretienById,
    updateStatusRhEntretien,
    deleteStatusRhEntretien
};