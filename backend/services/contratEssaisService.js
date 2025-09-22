const ContratEssai = require('../models/contratEssaisModel');

const createContratEssai = async (data) => {
    return await ContratEssai.create(data);
};

const getAllContratEssais = async () => {
    return await ContratEssai.findAll();
};

const getContratEssaiById = async (id) => {
    return await ContratEssai.findByPk(id);
};

const updateContratEssai = async (id, data) => {
    return await ContratEssai.update(data, { where: { id } });
};

const deleteContratEssai = async (id) => {
    return await ContratEssai.destroy({ where: { id } });
};

module.exports = {
    createContratEssai,
    getAllContratEssais,
    getContratEssaiById,
    updateContratEssai,
    deleteContratEssai
};