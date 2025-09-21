const Employe = require('../../models/employesModel');

const createEmploye = async (data) => {
    return await Employe.create(data);
};

const getAllEmployes = async () => {
    return await Employe.findAll();
};

const getEmployeById = async (id) => {
    return await Employe.findByPk(id);
};

const updateEmploye = async (id, data) => {
    return await Employe.update(data, { where: { id } });
};

const deleteEmploye = async (id) => {
    return await Employe.destroy({ where: { id } });
};

module.exports = {
    createEmploye,
    getAllEmployes,
    getEmployeById,
    updateEmploye,
    deleteEmploye
};