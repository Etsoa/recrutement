const ExperienceTiers = require('../../models/experienceTiersModel');

const createExperienceTiers = async (data) => {
    return await ExperienceTiers.create(data);
};

const getAllExperienceTiers = async () => {
    return await ExperienceTiers.findAll();
};

const getExperienceTiersById = async (id) => {
    return await ExperienceTiers.findByPk(id);
};

const updateExperienceTiers = async (id, data) => {
    return await ExperienceTiers.update(data, { where: { id } });
};

const deleteExperienceTiers = async (id) => {
    return await ExperienceTiers.destroy({ where: { id } });
};

module.exports = {
    createExperienceTiers,
    getAllExperienceTiers,
    getExperienceTiersById,
    updateExperienceTiers,
    deleteExperienceTiers
};