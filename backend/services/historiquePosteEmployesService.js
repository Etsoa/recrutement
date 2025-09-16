const HistoriquePosteEmployes = require('../models/historiquePosteEmployesModel');

const createHistoriquePosteEmploye = async (data) => {
    return await HistoriquePosteEmployes.create(data);
};

const getAllHistoriquePosteEmployes = async () => {
    return await HistoriquePosteEmployes.findAll();
};

const getHistoriquePosteEmployeById = async (id) => {
    return await HistoriquePosteEmployes.findByPk(id);
};

const updateHistoriquePosteEmploye = async (id, data) => {
    return await HistoriquePosteEmployes.update(data, { where: { id } });
};

const deleteHistoriquePosteEmploye = async (id) => {
    return await HistoriquePosteEmployes.destroy({ where: { id } });
};

module.exports = {
    createHistoriquePosteEmploye,
    getAllHistoriquePosteEmployes,
    getHistoriquePosteEmployeById,
    updateHistoriquePosteEmploye,
    deleteHistoriquePosteEmploye
};