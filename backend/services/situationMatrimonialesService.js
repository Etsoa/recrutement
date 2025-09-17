const SituationMatrimoniales = require('../models/situationMatrimonialesModel');

const createSituationMatrimoniale = async (data) => {
    return await SituationMatrimoniales.create(data);
};

const getAllSituationMatrimoniales = async () => {
    return await SituationMatrimoniales.findAll();
};

const getSituationMatrimonialeById = async (id) => {
    return await SituationMatrimoniales.findByPk(id);
};

const updateSituationMatrimoniale = async (id, data) => {
    return await SituationMatrimoniales.update(data, { where: { id } });
};

const deleteSituationMatrimoniale = async (id) => {
    return await SituationMatrimoniales.destroy({ where: { id } });
};

module.exports = {
    createSituationMatrimoniale,
    getAllSituationMatrimoniales,
    getSituationMatrimonialeById,
    updateSituationMatrimoniale,
    deleteSituationMatrimoniale
};