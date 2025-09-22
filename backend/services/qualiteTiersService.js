const QualiteTiers = require('../models/qualiteTiersModel');

const createQualiteTiers = async (data) => {
    return await QualiteTiers.create(data);
};

const getAllQualiteTiers = async () => {
    return await QualiteTiers.findAll();
};

const getQualiteTiersById = async (id) => {
    return await QualiteTiers.findByPk(id);
};

const updateQualiteTiers = async (id, data) => {
    return await QualiteTiers.update(data, { where: { id } });
};

const deleteQualiteTiers = async (id) => {
    return await QualiteTiers.destroy({ where: { id } });
};

module.exports = {
    createQualiteTiers,
    getAllQualiteTiers,
    getQualiteTiersById,
    updateQualiteTiers,
    deleteQualiteTiers
};