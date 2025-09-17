const LangueTiers = require('../models/langueTiersModel');

const createLangueTiers = async (data) => {
    return await LangueTiers.create(data);
};

const getAllLangueTiers = async () => {
    return await LangueTiers.findAll();
};

const getLangueTiersById = async (id) => {
    return await LangueTiers.findByPk(id);
};

const updateLangueTiers = async (id, data) => {
    return await LangueTiers.update(data, { where: { id } });
};

const deleteLangueTiers = async (id) => {
    return await LangueTiers.destroy({ where: { id } });
};

module.exports = {
    createLangueTiers,
    getAllLangueTiers,
    getLangueTiersById,
    updateLangueTiers,
    deleteLangueTiers
};