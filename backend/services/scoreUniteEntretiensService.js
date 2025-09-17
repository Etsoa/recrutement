const ScoreUniteEntretiens = require('../models/scoreUniteEntretiensModel');

const createScoreUniteEntretien = async (data) => {
    return await ScoreUniteEntretiens.create(data);
};

const getAllScoreUniteEntretiens = async () => {
    return await ScoreUniteEntretiens.findAll();
};

const getScoreUniteEntretienById = async (id) => {
    return await ScoreUniteEntretiens.findByPk(id);
};

const updateScoreUniteEntretien = async (id, data) => {
    return await ScoreUniteEntretiens.update(data, { where: { id } });
};

const deleteScoreUniteEntretien = async (id) => {
    return await ScoreUniteEntretiens.destroy({ where: { id } });
};

module.exports = {
    createScoreUniteEntretien,
    getAllScoreUniteEntretiens,
    getScoreUniteEntretienById,
    updateScoreUniteEntretien,
    deleteScoreUniteEntretien
};