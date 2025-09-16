const Postes = require('../models/postesModel');

const createPoste = async (data) => {
    return await Postes.create(data);
};

const getAllPostes = async () => {
    return await Postes.findAll();
};

const getPosteById = async (id) => {
    return await Postes.findByPk(id);
};

const updatePoste = async (id, data) => {
    return await Postes.update(data, { where: { id } });
};

const deletePoste = async (id) => {
    return await Postes.destroy({ where: { id } });
};

module.exports = {
    createPoste,
    getAllPostes,
    getPosteById,
    updatePoste,
    deletePoste
};