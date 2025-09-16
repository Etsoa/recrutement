const RhEntretiens = require('../models/rhEntretiensModel');

const createRhEntretien = async (data) => {
    return await RhEntretiens.create(data);
};

const getAllRhEntretiens = async () => {
    return await RhEntretiens.findAll();
};

const getRhEntretienById = async (id) => {
    return await RhEntretiens.findByPk(id);
};

const updateRhEntretien = async (id, data) => {
    return await RhEntretiens.update(data, { where: { id } });
};

const deleteRhEntretien = async (id) => {
    return await RhEntretiens.destroy({ where: { id } });
};

module.exports = {
    createRhEntretien,
    getAllRhEntretiens,
    getRhEntretienById,
    updateRhEntretien,
    deleteRhEntretien
};