const EnvoiQcmCandidats = require('../models/envoiQcmCandidatsModel');

const createEnvoiQcmCandidat = async (data) => {
    return await EnvoiQcmCandidats.create(data);
};

const getAllEnvoiQcmCandidats = async () => {
    return await EnvoiQcmCandidats.findAll();
};

const getEnvoiQcmCandidatById = async (id) => {
    return await EnvoiQcmCandidats.findByPk(id);
};

const updateEnvoiQcmCandidat = async (id, data) => {
    return await EnvoiQcmCandidats.update(data, { where: { id } });
};

const deleteEnvoiQcmCandidat = async (id) => {
    return await EnvoiQcmCandidats.destroy({ where: { id } });
};

module.exports = {
    createEnvoiQcmCandidat,
    getAllEnvoiQcmCandidats,
    getEnvoiQcmCandidatById,
    updateEnvoiQcmCandidat,
    deleteEnvoiQcmCandidat
};