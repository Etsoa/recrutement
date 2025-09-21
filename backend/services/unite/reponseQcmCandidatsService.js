const ReponseQcmCandidat = require('../../models/reponseQcmCandidatsModel');

const createReponseQcmCandidat = async (data) => {
    return await ReponseQcmCandidat.create(data);
};

const getAllReponseQcmCandidats = async () => {
    return await ReponseQcmCandidat.findAll();
};

const getReponseQcmCandidatById = async (id) => {
    return await ReponseQcmCandidat.findByPk(id);
};

const updateReponseQcmCandidat = async (id, data) => {
    return await ReponseQcmCandidat.update(data, { where: { id } });
};

const deleteReponseQcmCandidat = async (id) => {
    return await ReponseQcmCandidat.destroy({ where: { id } });
};

module.exports = {
    createReponseQcmCandidat,
    getAllReponseQcmCandidats,
    getReponseQcmCandidatById,
    updateReponseQcmCandidat,
    deleteReponseQcmCandidat
};