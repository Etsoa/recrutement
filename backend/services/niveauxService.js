const Niveaux = require('../models/niveauxModel');

const createNiveau = async (data) => {
    return await Niveaux.create(data);
};

const getAllNiveaux = async () => {
    return await Niveaux.findAll();
};

const getNiveauById = async (id) => {
    return await Niveaux.findByPk(id);
};

const updateNiveau = async (id, data) => {
    return await Niveaux.update(data, { where: { id } });
};

const deleteNiveau = async (id) => {
    return await Niveaux.destroy({ where: { id } });
};

module.exports = {
    createNiveau,
    getAllNiveaux,
    getNiveauById,
    updateNiveau,
    deleteNiveau
};