const Domaine = require('../models/domainesModel');

const createDomaine = async (data) => {
    return await Domaine.create(data);
};

const getAllDomaines = async () => {
    return await Domaine.findAll();
};

const getDomaineById = async (id) => {
    return await Domaine.findByPk(id);
};

const updateDomaine = async (id, data) => {
    return await Domaine.update(data, { where: { id } });
};

const deleteDomaine = async (id) => {
    return await Domaine.destroy({ where: { id } });
};

module.exports = {
    createDomaine,
    getAllDomaines,
    getDomaineById,
    updateDomaine,
    deleteDomaine
};