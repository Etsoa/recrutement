const CorpsMail = require('../models/corpsMailsModel');

const createCorpsMail = async (data) => {
    return await CorpsMail.create(data);
};

const getAllCorpsMails = async () => {
    return await CorpsMail.findAll();
};

const getCorpsMailById = async (id) => {
    return await CorpsMail.findByPk(id);
};

const updateCorpsMail = async (id, data) => {
    return await CorpsMail.update(data, { where: { id } });
};

const deleteCorpsMail = async (id) => {
    return await CorpsMail.destroy({ where: { id } });
};

module.exports = {
    createCorpsMail,
    getAllCorpsMails,
    getCorpsMailById,
    updateCorpsMail,
    deleteCorpsMail
};