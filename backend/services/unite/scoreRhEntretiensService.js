const ScoreRhEntretien = require('../../models/scoreRhEntretiensModel');

const createScoreRhEntretien = async (data) => {
    return await ScoreRhEntretien.create(data);
};

const getAllScoreRhEntretiens = async () => {
    return await ScoreRhEntretien.findAll();
};

const getScoreRhEntretienById = async (id) => {
    return await ScoreRhEntretien.findByPk(id);
};

const updateScoreRhEntretien = async (id, data) => {
    return await ScoreRhEntretien.update(data, { where: { id } });
};

const deleteScoreRhEntretien = async (id) => {
    return await ScoreRhEntretien.destroy({ where: { id } });
};

module.exports = {
    createScoreRhEntretien,
    getAllScoreRhEntretiens,
    getScoreRhEntretienById,
    updateScoreRhEntretien,
    deleteScoreRhEntretien
};