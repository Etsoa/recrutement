const QuestionQcm = require('../../models/questionQcmsModel');

const createQuestionQcm = async (data) => {
    return await QuestionQcm.create(data);
};

const getAllQuestionQcms = async () => {
    return await QuestionQcm.findAll();
};

const getQuestionQcmById = async (id) => {
    return await QuestionQcm.findByPk(id);
};

const updateQuestionQcm = async (id, data) => {
    return await QuestionQcm.update(data, { where: { id } });
};

const deleteQuestionQcm = async (id) => {
    return await QuestionQcm.destroy({ where: { id } });
};

module.exports = {
    createQuestionQcm,
    getAllQuestionQcms,
    getQuestionQcmById,
    updateQuestionQcm,
    deleteQuestionQcm
};