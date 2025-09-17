const Filiere = require('../models/filieresModel');

const createFiliere = async (data) => {
    return await Filiere.create(data);
};

const getAllFilieres = async () => {
    return await Filiere.findAll();
};

const getFiliereById = async (id) => {
    return await Filiere.findByPk(id);
};

const updateFiliere = async (id, data) => {
    return await Filiere.update(data, { where: { id } });
};

const deleteFiliere = async (id) => {
    return await Filiere.destroy({ where: { id } });
};

module.exports = {
    createFiliere,
    getAllFilieres,
    getFiliereById,
    updateFiliere,
    deleteFiliere
};