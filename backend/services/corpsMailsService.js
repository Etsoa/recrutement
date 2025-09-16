const CorpsMails = require('../models/corpsMailsModel');

const createCorpsMail = async (data) => {
    return await CorpsMails.create(data);
};

const getAllCorpsMails = async () => {
    return await CorpsMails.findAll();
};

const getCorpsMailById = async (id) => {
    return await CorpsMails.findByPk(id);
};

const updateCorpsMail = async (id, data) => {
    return await CorpsMails.update(data, { where: { id } });
};

const deleteCorpsMail = async (id) => {
    return await CorpsMails.destroy({ where: { id } });
};

module.exports = {
    createCorpsMail,
    getAllCorpsMails,
    getCorpsMailById,
    updateCorpsMail,
    deleteCorpsMail
};