const TypeStatusSuggestions = require('../models/typeStatusSuggestionsModel');

const createTypeStatusSuggestion = async (data) => {
    return await TypeStatusSuggestions.create(data);
};

const getAllTypeStatusSuggestions = async () => {
    return await TypeStatusSuggestions.findAll();
};

const getTypeStatusSuggestionById = async (id) => {
    return await TypeStatusSuggestions.findByPk(id);
};

const updateTypeStatusSuggestion = async (id, data) => {
    return await TypeStatusSuggestions.update(data, { where: { id } });
};

const deleteTypeStatusSuggestion = async (id) => {
    return await TypeStatusSuggestions.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusSuggestion,
    getAllTypeStatusSuggestions,
    getTypeStatusSuggestionById,
    updateTypeStatusSuggestion,
    deleteTypeStatusSuggestion
};