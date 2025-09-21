const StatusEmploye = require('../../models/statusEmployesModel');

const createStatusEmploye = async (data) => {
    return await StatusEmploye.create(data);
};

const getAllStatusEmployes = async () => {
    return await StatusEmploye.findAll();
};

const getStatusEmployeById = async (id) => {
    return await StatusEmploye.findByPk(id);
};

const updateStatusEmploye = async (id, data) => {
    return await StatusEmploye.update(data, { where: { id } });
};

const deleteStatusEmploye = async (id) => {
    return await StatusEmploye.destroy({ where: { id } });
};

module.exports = {
    createStatusEmploye,
    getAllStatusEmployes,
    getStatusEmployeById,
    updateStatusEmploye,
    deleteStatusEmploye
};