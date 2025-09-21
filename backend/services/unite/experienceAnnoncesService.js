const ExperienceAnnonce = require('../../models/experienceAnnoncesModel');

const createExperienceAnnonce = async (data) => {
    return await ExperienceAnnonce.create(data);
};

const getAllExperienceAnnonces = async () => {
    return await ExperienceAnnonce.findAll();
};

const getExperienceAnnonceById = async (id) => {
    return await ExperienceAnnonce.findByPk(id);
};

const updateExperienceAnnonce = async (id, data) => {
    return await ExperienceAnnonce.update(data, { where: { id } });
};

const deleteExperienceAnnonce = async (id) => {
    return await ExperienceAnnonce.destroy({ where: { id } });
};

module.exports = {
    createExperienceAnnonce,
    getAllExperienceAnnonces,
    getExperienceAnnonceById,
    updateExperienceAnnonce,
    deleteExperienceAnnonce
};