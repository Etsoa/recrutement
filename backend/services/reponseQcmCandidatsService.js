const ReponseQcmCandidats = require('../models/reponseQcmCandidatsModel');

const createReponseQcmCandidat = async (data) => {
    return await ReponseQcmCandidats.create(data);
};

const getAllReponseQcmCandidats = async () => {
    return await ReponseQcmCandidats.findAll();
};

const getReponseQcmCandidatById = async (id) => {
    return await ReponseQcmCandidats.findByPk(id);
};

const updateReponseQcmCandidat = async (id, data) => {
    return await ReponseQcmCandidats.update(data, { where: { id } });
};

const deleteReponseQcmCandidat = async (id) => {
    return await ReponseQcmCandidats.destroy({ where: { id } });
};

module.exports = {
    createReponseQcmCandidat,
    getAllReponseQcmCandidats,
    getReponseQcmCandidatById,
    updateReponseQcmCandidat,
    deleteReponseQcmCandidat
};