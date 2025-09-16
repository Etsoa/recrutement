const PourcentageMinimumCv = require('../models/pourcentageMinimumCvModel');

const createPourcentageMinimumCv = async (data) => {
    return await PourcentageMinimumCv.create(data);
};

const getAllPourcentageMinimumCv = async () => {
    return await PourcentageMinimumCv.findAll();
};

const getPourcentageMinimumCvById = async (id) => {
    return await PourcentageMinimumCv.findByPk(id);
};

const updatePourcentageMinimumCv = async (id, data) => {
    return await PourcentageMinimumCv.update(data, { where: { id } });
};

const deletePourcentageMinimumCv = async (id) => {
    return await PourcentageMinimumCv.destroy({ where: { id } });
};

module.exports = {
    createPourcentageMinimumCv,
    getAllPourcentageMinimumCv,
    getPourcentageMinimumCvById,
    updatePourcentageMinimumCv,
    deletePourcentageMinimumCv
};