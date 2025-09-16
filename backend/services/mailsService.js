const Mails = require('../models/mailsModel');

const createMail = async (data) => {
    return await Mails.create(data);
};

const getAllMails = async () => {
    return await Mails.findAll();
};

const getMailById = async (id) => {
    return await Mails.findByPk(id);
};

const updateMail = async (id, data) => {
    return await Mails.update(data, { where: { id } });
};

const deleteMail = async (id) => {
    return await Mails.destroy({ where: { id } });
};

module.exports = {
    createMail,
    getAllMails,
    getMailById,
    updateMail,
    deleteMail
};