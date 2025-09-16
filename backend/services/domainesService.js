const Domaines = require('../models/domainesModel');

const createDomaine = async (data) => {
    return await Domaines.create(data);
};

const getAllDomaines = async () => {
    return await Domaines.findAll();
};

const getDomaineById = async (id) => {
    return await Domaines.findByPk(id);
};

const updateDomaine = async (id, data) => {
    return await Domaines.update(data, { where: { id } });
};

const deleteDomaine = async (id) => {
    return await Domaines.destroy({ where: { id } });
};

module.exports = {
    createDomaine,
    getAllDomaines,
    getDomaineById,
    updateDomaine,
    deleteDomaine
};