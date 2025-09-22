const ScoreMinimumQcm = require('../models/scoreMinimumQcmModel');

const createScoreMinimumQcm = async (data) => {
    return await ScoreMinimumQcm.create(data);
};

const getAllScoreMinimumQcm = async () => {
    return await ScoreMinimumQcm.findAll();
};

const getScoreMinimumQcmById = async (id) => {
    return await ScoreMinimumQcm.findByPk(id);
};

const updateScoreMinimumQcm = async (id, data) => {
    return await ScoreMinimumQcm.update(data, { where: { id } });
};

const deleteScoreMinimumQcm = async (id) => {
    return await ScoreMinimumQcm.destroy({ where: { id } });
};

module.exports = {
    createScoreMinimumQcm,
    getAllScoreMinimumQcm,
    getScoreMinimumQcmById,
    updateScoreMinimumQcm,
    deleteScoreMinimumQcm
};