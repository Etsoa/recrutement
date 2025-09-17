const HistoriquePosteEmploye = require('../models/historiquePosteEmployesModel');

const createHistoriquePosteEmploye = async (data) => {
    return await HistoriquePosteEmploye.create(data);
};

const getAllHistoriquePosteEmployes = async () => {
    return await HistoriquePosteEmploye.findAll();
};

const getHistoriquePosteEmployeById = async (id) => {
    return await HistoriquePosteEmploye.findByPk(id);
};

const updateHistoriquePosteEmploye = async (id, data) => {
    return await HistoriquePosteEmploye.update(data, { where: { id } });
};

const deleteHistoriquePosteEmploye = async (id) => {
    return await HistoriquePosteEmploye.destroy({ where: { id } });
};

module.exports = {
    createHistoriquePosteEmploye,
    getAllHistoriquePosteEmployes,
    getHistoriquePosteEmployeById,
    updateHistoriquePosteEmploye,
    deleteHistoriquePosteEmploye
};