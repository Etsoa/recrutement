const TypeStatusSuggestion = require('../models/typeStatusSuggestionsModel');

const createTypeStatusSuggestion = async (data) => {
    return await TypeStatusSuggestion.create(data);
};

const getAllTypeStatusSuggestions = async () => {
    return await TypeStatusSuggestion.findAll();
};

const getTypeStatusSuggestionById = async (id) => {
    return await TypeStatusSuggestion.findByPk(id);
};

const updateTypeStatusSuggestion = async (id, data) => {
    return await TypeStatusSuggestion.update(data, { where: { id } });
};

const deleteTypeStatusSuggestion = async (id) => {
    return await TypeStatusSuggestion.destroy({ where: { id } });
};

module.exports = {
    createTypeStatusSuggestion,
    getAllTypeStatusSuggestions,
    getTypeStatusSuggestionById,
    updateTypeStatusSuggestion,
    deleteTypeStatusSuggestion
};