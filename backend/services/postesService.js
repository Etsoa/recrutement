const Poste = require('../models/postesModel');
const Unite = require('../models/unitesModel');

const createPoste = async (data) => {
    return await Poste.create(data);
};

const getAllPostes = async () => {
    return await Poste.findAll();
};

const getPosteById = async (id) => {
    return await Poste.findByPk(id);
};

const updatePoste = async (id, data) => {
    return await Poste.update(data, { where: { id } });
};

const deletePoste = async (id) => {
    return await Poste.destroy({ where: { id } });
};

module.exports = {
    createPoste,
    getAllPostes,
    getPosteById,
    updatePoste,
    deletePoste
};