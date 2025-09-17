const ScoreRhEntretiens = require('../models/scoreRhEntretiensModel');

const createScoreRhEntretien = async (data) => {
    return await ScoreRhEntretiens.create(data);
};

const getAllScoreRhEntretiens = async () => {
    return await ScoreRhEntretiens.findAll();
};

const getScoreRhEntretienById = async (id) => {
    return await ScoreRhEntretiens.findByPk(id);
};

const updateScoreRhEntretien = async (id, data) => {
    return await ScoreRhEntretiens.update(data, { where: { id } });
};

const deleteScoreRhEntretien = async (id) => {
    return await ScoreRhEntretiens.destroy({ where: { id } });
};

module.exports = {
    createScoreRhEntretien,
    getAllScoreRhEntretiens,
    getScoreRhEntretienById,
    updateScoreRhEntretien,
    deleteScoreRhEntretien
};