const Tiers = require('../models/tiers');

const createTiers = async (data) => {
    return await Tiers.create(data);
};

const getAllTiers = async () => {
    return await Tiers.findAll();
};

const getTiersById = async (id) => {
    return await Tiers.findByPk(id);
};

const updateTiers = async (id, data) => {
    return await Tiers.update(data, { where: { id } });
};

const deleteTiers = async (id) => {
    return await Tiers.destroy({ where: { id } });
};

module.exports = {
    createTiers,
    getAllTiers,
    getTiersById,
    updateTiers,
    deleteTiers
};