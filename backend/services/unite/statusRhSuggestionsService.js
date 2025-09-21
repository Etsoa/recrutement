const StatusRhSuggestion = require('../../models/statusRhSuggestionsModel');

// Créer un nouveau status RH suggestion
const createStatusRhSuggestion = async (data) => {
  return await StatusRhSuggestion.create(data);
};

// Récupérer tous les status RH suggestions
const getAllStatusRhSuggestions = async () => {
  return await StatusRhSuggestion.findAll();
};

// Récupérer un status RH suggestion par ID
const getStatusRhSuggestionById = async (id) => {
  return await StatusRhSuggestion.findByPk(id);
};

// Mettre à jour un status RH suggestion
const updateStatusRhSuggestion = async (id, data) => {
  return await StatusRhSuggestion.update(data, { where: { id_status_rh_suggestion: id } });
};

// Supprimer un status RH suggestion
const deleteStatusRhSuggestion = async (id) => {
  return await StatusRhSuggestion.destroy({ where: { id_status_rh_suggestion: id } });
};

module.exports = {
  createStatusRhSuggestion,
  getAllStatusRhSuggestions,
  getStatusRhSuggestionById,
  updateStatusRhSuggestion,
  deleteStatusRhSuggestion
};
