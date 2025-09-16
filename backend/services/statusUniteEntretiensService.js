const StatusUniteEntretiens = require('../models/statusUniteEntretiensModel');

const createStatusUniteEntretien = async (data) => {
    return await StatusUniteEntretiens.create(data);
};

const getAllStatusUniteEntretiens = async () => {
    return await StatusUniteEntretiens.findAll();
};

const getStatusUniteEntretienById = async (id) => {
    return await StatusUniteEntretiens.findByPk(id);
};

const updateStatusUniteEntretien = async (id, data) => {
    return await StatusUniteEntretiens.update(data, { where: { id } });
};

const deleteStatusUniteEntretien = async (id) => {
    return await StatusUniteEntretiens.destroy({ where: { id } });
};

module.exports = {
    createStatusUniteEntretien,
    getAllStatusUniteEntretiens,
    getStatusUniteEntretienById,
    updateStatusUniteEntretien,
    deleteStatusUniteEntretien
};