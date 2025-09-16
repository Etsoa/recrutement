const ReponseQcms = require('../models/reponseQcmsModel');

const createReponseQcm = async (data) => {
    return await ReponseQcms.create(data);
};

const getAllReponseQcms = async () => {
    return await ReponseQcms.findAll();
};

const getReponseQcmById = async (id) => {
    return await ReponseQcms.findByPk(id);
};

const updateReponseQcm = async (id, data) => {
    return await ReponseQcms.update(data, { where: { id } });
};

const deleteReponseQcm = async (id) => {
    return await ReponseQcms.destroy({ where: { id } });
};

module.exports = {
    createReponseQcm,
    getAllReponseQcms,
    getReponseQcmById,
    updateReponseQcm,
    deleteReponseQcm
};