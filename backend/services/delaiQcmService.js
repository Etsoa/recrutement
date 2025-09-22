const DelaiQcm = require('../models/delaiQcmModel');

const createDelaiQcm = async (data) => {
    return await DelaiQcm.create(data);
};

const getAllDelaiQcms = async () => {
    return await DelaiQcm.findAll();
};

const getDelaiQcmById = async (id) => {
    return await DelaiQcm.findByPk(id);
};

const updateDelaiQcm = async (id, data) => {
    return await DelaiQcm.update(data, { where: { id } });
};

const deleteDelaiQcm = async (id) => {
    return await DelaiQcm.destroy({ where: { id } });
};

module.exports = {
    createDelaiQcm,
    getAllDelaiQcms,
    getDelaiQcmById,
    updateDelaiQcm,
    deleteDelaiQcm
};