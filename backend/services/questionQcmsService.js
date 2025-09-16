const QuestionQcms = require('../models/questionQcmsModel');

const createQuestionQcm = async (data) => {
    return await QuestionQcms.create(data);
};

const getAllQuestionQcms = async () => {
    return await QuestionQcms.findAll();
};

const getQuestionQcmById = async (id) => {
    return await QuestionQcms.findByPk(id);
};

const updateQuestionQcm = async (id, data) => {
    return await QuestionQcms.update(data, { where: { id } });
};

const deleteQuestionQcm = async (id) => {
    return await QuestionQcms.destroy({ where: { id } });
};

module.exports = {
    createQuestionQcm,
    getAllQuestionQcms,
    getQuestionQcmById,
    updateQuestionQcm,
    deleteQuestionQcm
};