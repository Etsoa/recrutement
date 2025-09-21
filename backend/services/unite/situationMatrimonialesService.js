const SituationMatrimoniale = require('../../models/situationMatrimonialesModel');

const createSituationMatrimoniale = async (data) => {
    return await SituationMatrimoniale.create(data);
};

const getAllSituationMatrimoniales = async () => {
    return await SituationMatrimoniale.findAll();
};

const getSituationMatrimonialeById = async (id) => {
    return await SituationMatrimoniale.findByPk(id);
};

const updateSituationMatrimoniale = async (id, data) => {
    return await SituationMatrimoniale.update(data, { where: { id } });
};

const deleteSituationMatrimoniale = async (id) => {
    return await SituationMatrimoniale.destroy({ where: { id } });
};

module.exports = {
    createSituationMatrimoniale,
    getAllSituationMatrimoniales,
    getSituationMatrimonialeById,
    updateSituationMatrimoniale,
    deleteSituationMatrimoniale
};