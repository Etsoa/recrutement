const Villes = require('../models/villesModel');

const createVille = async (data) => {
    return await Villes.create(data);
};

const getAllVilles = async () => {
    return await Villes.findAll();
};

const getVilleById = async (id) => {
    return await Villes.findByPk(id);
};

const updateVille = async (id, data) => {
    return await Villes.update(data, { where: { id } });
};

const deleteVille = async (id) => {
    return await Villes.destroy({ where: { id } });
};

module.exports = {
    createVille,
    getAllVilles,
    getVilleById,
    updateVille,
    deleteVille
};