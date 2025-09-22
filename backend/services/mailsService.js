const Mail = require('../models/mailsModel');

const createMail = async (data) => {
    return await Mail.create(data);
};

const getAllMails = async () => {
    return await Mail.findAll();
};

const getMailById = async (id) => {
    return await Mail.findByPk(id);
};

const updateMail = async (id, data) => {
    return await Mail.update(data, { where: { id } });
};

const deleteMail = async (id) => {
    return await Mail.destroy({ where: { id } });
};

module.exports = {
    createMail,
    getAllMails,
    getMailById,
    updateMail,
    deleteMail
};