const RhSuggestions = require('../models/rhSuggestionsModel');

const createRhSuggestion = async (data) => {
    return await RhSuggestions.create(data);
};

const getAllRhSuggestions = async () => {
    return await RhSuggestions.findAll();
};

const getRhSuggestionById = async (id) => {
    return await RhSuggestions.findByPk(id);
};

const updateRhSuggestion = async (id, data) => {
    return await RhSuggestions.update(data, { where: { id } });
};

const deleteRhSuggestion = async (id) => {
    return await RhSuggestions.destroy({ where: { id } });
};

module.exports = {
    createRhSuggestion,
    getAllRhSuggestions,
    getRhSuggestionById,
    updateRhSuggestion,
    deleteRhSuggestion
};