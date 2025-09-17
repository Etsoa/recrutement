const Candidat = require('../models/candidatsModel');

const createCandidat = async (data) => {
    return await Candidat.create(data);
};

const getAllCandidats = async () => {
    return await Candidat.findAll();
};

const getCandidatById = async (id) => {
    return await Candidat.findByPk(id);
};

const updateCandidat = async (id, data) => {
    return await Candidat.update(data, { where: { id } });
};

const deleteCandidat = async (id) => {
    return await Candidat.destroy({ where: { id } });
};

module.exports = {
    createCandidat,
    getAllCandidats,
    getCandidatById,
    updateCandidat,
    deleteCandidat
};