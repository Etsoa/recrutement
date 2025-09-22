const QualiteAnnonce = require('../models/qualiteAnnoncesModel');

const createQualiteAnnonce = async (data) => {
    return await QualiteAnnonce.create(data);
};

const getAllQualiteAnnonces = async () => {
    return await QualiteAnnonce.findAll();
};

const getQualiteAnnonceById = async (id) => {
    return await QualiteAnnonce.findByPk(id);
};

const updateQualiteAnnonce = async (id, data) => {
    return await QualiteAnnonce.update(data, { where: { id } });
};

const deleteQualiteAnnonce = async (id) => {
    return await QualiteAnnonce.destroy({ where: { id } });
};

module.exports = {
    createQualiteAnnonce,
    getAllQualiteAnnonces,
    getQualiteAnnonceById,
    updateQualiteAnnonce,
    deleteQualiteAnnonce
};