const NiveauFiliereAnnonces = require('../../models/niveauFiliereAnnoncesModel');

const createNiveauFiliereAnnonce = async (data) => {
    return await NiveauFiliereAnnonces.create(data);
};

const getAllNiveauFiliereAnnonces = async () => {
    return await NiveauFiliereAnnonces.findAll();
};

const getNiveauFiliereAnnonceById = async (id) => {
    return await NiveauFiliereAnnonces.findByPk(id);
};

const updateNiveauFiliereAnnonce = async (id, data) => {
    return await NiveauFiliereAnnonces.update(data, { where: { id } });
};

const deleteNiveauFiliereAnnonce = async (id) => {
    return await NiveauFiliereAnnonces.destroy({ where: { id } });
};

module.exports = {
    createNiveauFiliereAnnonce,
    getAllNiveauFiliereAnnonces,
    getNiveauFiliereAnnonceById,
    updateNiveauFiliereAnnonce,
    deleteNiveauFiliereAnnonce
};