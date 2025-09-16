const Employes = require('../models/employesModel');

const createEmploye = async (data) => {
    return await Employes.create(data);
};

const getAllEmployes = async () => {
    return await Employes.findAll();
};

const getEmployeById = async (id) => {
    return await Employes.findByPk(id);
};

const updateEmploye = async (id, data) => {
    return await Employes.update(data, { where: { id } });
};

const deleteEmploye = async (id) => {
    return await Employes.destroy({ where: { id } });
};

module.exports = {
    createEmploye,
    getAllEmployes,
    getEmployeById,
    updateEmploye,
    deleteEmploye
};