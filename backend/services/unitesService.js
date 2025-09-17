const Unites = require('../models/unitesModel');

const createUnite = async (data) => {
    return await Unites.create(data);
};

const getAllUnites = async () => {
    return await Unites.findAll();
};

const getUniteById = async (id) => {
    return await Unites.findByPk(id);
};

const updateUnite = async (id, data) => {
    return await Unites.update(data, { where: { id } });
};

const deleteUnite = async (id) => {
    return await Unites.destroy({ where: { id } });
};

module.exports = {
    createUnite,
    getAllUnites,
    getUniteById,
    updateUnite,
    deleteUnite
};