const EnvoiQcmCandidat = require('../../models/envoiQcmCandidatsModel');

const createEnvoiQcmCandidat = async (data) => {
    return await EnvoiQcmCandidat.create(data);
};

const getAllEnvoiQcmCandidats = async () => {
    return await EnvoiQcmCandidat.findAll();
};

const getEnvoiQcmCandidatById = async (id) => {
    return await EnvoiQcmCandidat.findByPk(id);
};

const updateEnvoiQcmCandidat = async (id, data) => {
    return await EnvoiQcmCandidat.update(data, { where: { id } });
};

const deleteEnvoiQcmCandidat = async (id) => {
    return await EnvoiQcmCandidat.destroy({ where: { id } });
};

module.exports = {
    createEnvoiQcmCandidat,
    getAllEnvoiQcmCandidats,
    getEnvoiQcmCandidatById,
    updateEnvoiQcmCandidat,
    deleteEnvoiQcmCandidat
};