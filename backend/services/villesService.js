const Ville = require('../models/villesModel');

const createVille = async (data) => {
    return await Ville.create(data);
};

const getAllVilles = async () => {
    return await Ville.findAll();
};

const getVilleById = async (id) => {
    return await Ville.findByPk(id);
};

const updateVille = async (id, data) => {
    return await Ville.update(data, { where: { id } });
};

const deleteVille = async (id) => {
    return await Ville.destroy({ where: { id } });
};

module.exports = {
    createVille,
    getAllVilles,
    getVilleById,
    updateVille,
    deleteVille
};