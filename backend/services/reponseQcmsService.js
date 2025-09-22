const ReponseQcm = require('../models/reponseQcmsModel');

const createReponseQcm = async (data) => {
    return await ReponseQcm.create(data);
};

const getAllReponseQcms = async () => {
    return await ReponseQcm.findAll();
};

const getReponseQcmById = async (id) => {
    return await ReponseQcm.findByPk(id);
};

const updateReponseQcm = async (id, data) => {
    return await ReponseQcm.update(data, { where: { id } });
};

const deleteReponseQcm = async (id) => {
    return await ReponseQcm.destroy({ where: { id } });
};

module.exports = {
    createReponseQcm,
    getAllReponseQcms,
    getReponseQcmById,
    updateReponseQcm,
    deleteReponseQcm
};