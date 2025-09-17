const RhSuggestion = require('../models/rhSuggestionsModel');

// Créer une nouvelle suggestion RH
const createRhSuggestion = async (data) => {
  return await RhSuggestion.create(data);
};

// Récupérer toutes les suggestions RH
const getAllRhSuggestions = async () => {
  return await RhSuggestion.findAll();
};

// Récupérer une suggestion RH par ID
const getRhSuggestionById = async (id) => {
  return await RhSuggestion.findByPk(id);
};

// Mettre à jour une suggestion RH
const updateRhSuggestion = async (id, data) => {
  return await RhSuggestion.update(data, { where: { id_rh_suggestion: id } });
};

// Supprimer une suggestion RH
const deleteRhSuggestion = async (id) => {
  return await RhSuggestion.destroy({ where: { id_rh_suggestion: id } });
};

module.exports = {
  createRhSuggestion,
  getAllRhSuggestions,
  getRhSuggestionById,
  updateRhSuggestion,
  deleteRhSuggestion
};
