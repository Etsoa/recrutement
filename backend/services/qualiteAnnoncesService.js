const QualiteAnnonces = require('../models/qualiteAnnoncesModel');

const createQualiteAnnonce = async (data) => {
    return await QualiteAnnonces.create(data);
};

const getAllQualiteAnnonces = async () => {
    return await QualiteAnnonces.findAll();
};

const getQualiteAnnonceById = async (id) => {
    return await QualiteAnnonces.findByPk(id);
};

const updateQualiteAnnonce = async (id, data) => {
    return await QualiteAnnonces.update(data, { where: { id } });
};

const deleteQualiteAnnonce = async (id) => {
    return await QualiteAnnonces.destroy({ where: { id } });
};

module.exports = {
    createQualiteAnnonce,
    getAllQualiteAnnonces,
    getQualiteAnnonceById,
    updateQualiteAnnonce,
    deleteQualiteAnnonce
};