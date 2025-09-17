const ContratEssais = require('../models/contratEssaisModel');

const createContratEssai = async (data) => {
    return await ContratEssais.create(data);
};

const getAllContratEssais = async () => {
    return await ContratEssais.findAll();
};

const getContratEssaiById = async (id) => {
    return await ContratEssais.findByPk(id);
};

const updateContratEssai = async (id, data) => {
    return await ContratEssais.update(data, { where: { id } });
};

const deleteContratEssai = async (id) => {
    return await ContratEssais.destroy({ where: { id } });
};

module.exports = {
    createContratEssai,
    getAllContratEssais,
    getContratEssaiById,
    updateContratEssai,
    deleteContratEssai
};