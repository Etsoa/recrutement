const Qualites = require('../models/qualitesModel');

const createQualite = async (data) => {
    return await Qualites.create(data);
};

const getAllQualites = async () => {
    return await Qualites.findAll();
};

const getQualiteById = async (id) => {
    return await Qualites.findByPk(id);
};

const updateQualite = async (id, data) => {
    return await Qualites.update(data, { where: { id } });
};

const deleteQualite = async (id) => {
    return await Qualites.destroy({ where: { id } });
};

module.exports = {
    createQualite,
    getAllQualites,
    getQualiteById,
    updateQualite,
    deleteQualite
};