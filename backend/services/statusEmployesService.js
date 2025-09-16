const StatusEmployes = require('../models/statusEmployesModel');

const createStatusEmploye = async (data) => {
    return await StatusEmployes.create(data);
};

const getAllStatusEmployes = async () => {
    return await StatusEmployes.findAll();
};

const getStatusEmployeById = async (id) => {
    return await StatusEmployes.findByPk(id);
};

const updateStatusEmploye = async (id, data) => {
    return await StatusEmployes.update(data, { where: { id } });
};

const deleteStatusEmploye = async (id) => {
    return await StatusEmployes.destroy({ where: { id } });
};

module.exports = {
    createStatusEmploye,
    getAllStatusEmployes,
    getStatusEmployeById,
    updateStatusEmploye,
    deleteStatusEmploye
};