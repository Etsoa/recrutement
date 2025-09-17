const Langues = require('../models/languesModel');

const createLangue = async (data) => {
    return await Langues.create(data);
};

const getAllLangues = async () => {
    return await Langues.findAll();
};

const getLangueById = async (id) => {
    return await Langues.findByPk(id);
};

const updateLangue = async (id, data) => {
    return await Langues.update(data, { where: { id } });
};

const deleteLangue = async (id) => {
    return await Langues.destroy({ where: { id } });
};

module.exports = {
    createLangue,
    getAllLangues,
    getLangueById,
    updateLangue,
    deleteLangue
};