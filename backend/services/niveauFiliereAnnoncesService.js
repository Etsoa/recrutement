const NiveauFiliereAnnonces = require('../models/niveauFiliereAnnoncesModel');

const createNiveauFiliereAnnonce = async (data) => {
    return await NiveauFiliereAnnonce.create(data);
};

const getAllNiveauFiliereAnnonces = async () => {
    return await NiveauFiliereAnnonce.findAll();
};

const getNiveauFiliereAnnonceById = async (id) => {
    return await NiveauFiliereAnnonce.findByPk(id);
};

const updateNiveauFiliereAnnonce = async (id, data) => {
    return await NiveauFiliereAnnonce.update(data, { where: { id } });
};

const deleteNiveauFiliereAnnonce = async (id) => {
    return await NiveauFiliereAnnonce.destroy({ where: { id } });
};

module.exports = {
    createNiveauFiliereAnnonce,
    getAllNiveauFiliereAnnonces,
    getNiveauFiliereAnnonceById,
    updateNiveauFiliereAnnonce,
    deleteNiveauFiliereAnnonce
};