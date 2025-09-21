const Qualite = require('../../models/qualitesModel');

const createQualite = async (data) => {
    return await Qualite.create(data);
};

const getAllQualites = async () => {
    return await Qualite.findAll();
};

const getQualiteById = async (id) => {
    return await Qualite.findByPk(id);
};

const updateQualite = async (id, data) => {
    return await Qualite.update(data, { where: { id } });
};

const deleteQualite = async (id) => {
    return await Qualite.destroy({ where: { id } });
};

module.exports = {
    createQualite,
    getAllQualites,
    getQualiteById,
    updateQualite,
    deleteQualite
};