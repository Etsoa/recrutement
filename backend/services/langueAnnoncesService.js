const LangueAnnonce = require('../models/langueAnnoncesModel');

const createLangueAnnonce = async (data) => {
    return await LangueAnnonce.create(data);
};

const getAllLangueAnnonces = async () => {
    return await LangueAnnonce.findAll();
};
const getLangueAnnoncesByIdAnnonce = async (id_annonce) => {
    return await LangueAnnonce.findAll({
        where: { id_annonce }
    });
};


const getLangueAnnonceById = async (id) => {
    return await LangueAnnonce.findByPk(id);
};

const updateLangueAnnonce = async (id, data) => {
    return await LangueAnnonce.update(data, { where: { id } });
};

const deleteLangueAnnonce = async (id) => {
    return await LangueAnnonce.destroy({ where: { id } });
};

module.exports = {
    createLangueAnnonce,
    getAllLangueAnnonces,
    getLangueAnnoncesByIdAnnonce,
    getLangueAnnonceById,
    updateLangueAnnonce,
    deleteLangueAnnonce
};