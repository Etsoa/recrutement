const ScoreUniteEntretien = require('../models/scoreUniteEntretiensModel');

const createScoreUniteEntretien = async (data) => {
    return await ScoreUniteEntretien.create(data);
};

const getAllScoreUniteEntretiens = async () => {
    return await ScoreUniteEntretien.findAll();
};

const getScoreUniteEntretienById = async (id) => {
    return await ScoreUniteEntretien.findByPk(id);
};

const updateScoreUniteEntretien = async (id, data) => {
    return await ScoreUniteEntretien.update(data, { where: { id } });
};

const deleteScoreUniteEntretien = async (id) => {
    return await ScoreUniteEntretien.destroy({ where: { id } });
};

module.exports = {
    createScoreUniteEntretien,
    getAllScoreUniteEntretiens,
    getScoreUniteEntretienById,
    updateScoreUniteEntretien,
    deleteScoreUniteEntretien
};