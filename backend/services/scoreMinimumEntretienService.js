const ScoreMinimumEntretien = require('../models/scoreMinimumEntretienModel.js');

const createScoreMinimumEntretien = async (data) => {
    return await ScoreMinimumEntretien.create(data);
};

const getAllScoreMinimumEntretiens = async () => {
    return await ScoreMinimumEntretien.findAll();
};

const getScoreMinimumEntretienById = async (id) => {
    return await ScoreMinimumEntretien.findByPk(id);
};

const updateScoreMinimumEntretien = async (id, data) => {
    return await ScoreMinimumEntretien.update(data, { where: { id } });
};

const deleteScoreMinimumEntretien = async (id) => {
    return await ScoreMinimumEntretien.destroy({ where: { id } });
};

module.exports = {
    createScoreMinimumEntretien,
    getAllScoreMinimumEntretiens,
    getScoreMinimumEntretienById,
    updateScoreMinimumEntretien,
    deleteScoreMinimumEntretien
};