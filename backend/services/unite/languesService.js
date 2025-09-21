const Langue = require('../../models/languesModel');

const createLangue = async (data) => {
    return await Langue.create(data);
};

const getAllLangues = async () => {
    return await Langue.findAll();
};

const getLangueById = async (id) => {
    return await Langue.findByPk(id);
};

const updateLangue = async (id, data) => {
    return await Langue.update(data, { where: { id } });
};

const deleteLangue = async (id) => {
    return await Langue.destroy({ where: { id } });
};

module.exports = {
    createLangue,
    getAllLangues,
    getLangueById,
    updateLangue,
    deleteLangue
};