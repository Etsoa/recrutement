const Filieres = require('../models/filieresModel');

const createFiliere = async (data) => {
    return await Filieres.create(data);
};

const getAllFilieres = async () => {
    return await Filieres.findAll();
};

const getFiliereById = async (id) => {
    return await Filieres.findByPk(id);
};

const updateFiliere = async (id, data) => {
    return await Filieres.update(data, { where: { id } });
};

const deleteFiliere = async (id) => {
    return await Filieres.destroy({ where: { id } });
};

module.exports = {
    createFiliere,
    getAllFilieres,
    getFiliereById,
    updateFiliere,
    deleteFiliere
};