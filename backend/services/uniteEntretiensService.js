const UniteEntretiens = require('../models/uniteEntretiensModel.js');

const createUniteEntretien = async (data) => {
    return await UniteEntretiens.create(data);
};

const getAllUniteEntretiens = async () => {
    return await UniteEntretiens.findAll();
};

const getUniteEntretienById = async (id) => {
    return await UniteEntretiens.findByPk(id);
};

const updateUniteEntretien = async (id, data) => {
    return await UniteEntretiens.update(data, { where: { id } });
};

const deleteUniteEntretien = async (id) => {
    return await UniteEntretiens.destroy({ where: { id } });
};

module.exports = {
    createUniteEntretien,
    getAllUniteEntretiens,
    getUniteEntretienById,
    updateUniteEntretien,
    deleteUniteEntretien
};