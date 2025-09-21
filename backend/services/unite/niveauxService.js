const Niveau = require('../../models/niveauxModel');

const createNiveau = async (data) => {
    return await Niveau.create(data);
};

const getAllNiveaux = async () => {
    return await Niveau.findAll();
};

const getNiveauById = async (id) => {
    return await Niveau.findByPk(id);
};

const updateNiveau = async (id, data) => {
    return await Niveau.update(data, { where: { id } });
};

const deleteNiveau = async (id) => {
    return await Niveau.destroy({ where: { id } });
};

module.exports = {
    createNiveau,
    getAllNiveaux,
    getNiveauById,
    updateNiveau,
    deleteNiveau
};