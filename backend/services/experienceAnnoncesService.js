const ExperienceAnnonces = require('../models/experienceAnnoncesModel');

const createExperienceAnnonce = async (data) => {
    return await ExperienceAnnonces.create(data);
};

const getAllExperienceAnnonces = async () => {
    return await ExperienceAnnonces.findAll();
};

const getExperienceAnnonceById = async (id) => {
    return await ExperienceAnnonces.findByPk(id);
};

const updateExperienceAnnonce = async (id, data) => {
    return await ExperienceAnnonces.update(data, { where: { id } });
};

const deleteExperienceAnnonce = async (id) => {
    return await ExperienceAnnonces.destroy({ where: { id } });
};

module.exports = {
    createExperienceAnnonce,
    getAllExperienceAnnonces,
    getExperienceAnnonceById,
    updateExperienceAnnonce,
    deleteExperienceAnnonce
};