const Candidats = require('../models/candidatsModel');

const createCandidat = async (data) => {
    return await Candidats.create(data);
};

const getAllCandidats = async () => {
    return await Candidats.findAll();
};

const getCandidatById = async (id) => {
    return await Candidats.findByPk(id);
};

const updateCandidat = async (id, data) => {
    return await Candidats.update(data, { where: { id } });
};

const deleteCandidat = async (id) => {
    return await Candidats.destroy({ where: { id } });
};

module.exports = {
    createCandidat,
    getAllCandidats,
    getCandidatById,
    updateCandidat,
    deleteCandidat
};