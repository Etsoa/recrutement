const CeoSuggestions = require('../models/ceoSuggestionsModel.js');

const createCeoSuggestion = async (data) => {
    return await CeoSuggestions.create(data);
};

const getAllCeoSuggestions = async () => {
    return await CeoSuggestions.findAll();
};

const getCeoSuggestionById = async (id) => {
    return await CeoSuggestions.findByPk(id);
};

const updateCeoSuggestion = async (id, data) => {
    return await CeoSuggestions.update(data, { where: { id } });
};

const deleteCeoSuggestion = async (id) => {
    return await CeoSuggestions.destroy({ where: { id } });
};

module.exports = {
    createCeoSuggestion,
    getAllCeoSuggestions,
    getCeoSuggestionById,
    updateCeoSuggestion,
    deleteCeoSuggestion
};