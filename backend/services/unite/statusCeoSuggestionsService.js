const StatusCeoSuggestion = require('../../models/statusCeoSuggestionsModel');

// Créer un nouveau statut de suggestion CEO
const createStatusCeoSuggestion = async (data) => {
  return await StatusCeoSuggestion.create(data);
};

// Récupérer tous les statuts de suggestions CEO
const getAllStatusCeoSuggestions = async () => {
  return await StatusCeoSuggestion.findAll();
};

// Récupérer un statut de suggestion CEO par ID
const getStatusCeoSuggestionById = async (id) => {
  return await StatusCeoSuggestion.findByPk(id);
};

// Mettre à jour un statut de suggestion CEO
const updateStatusCeoSuggestion = async (id, data) => {
  return await StatusCeoSuggestion.update(data, { where: { id_status_ceo_suggestion: id } });
};

// Supprimer un statut de suggestion CEO
const deleteStatusCeoSuggestion = async (id) => {
  return await StatusCeoSuggestion.destroy({ where: { id_status_ceo_suggestion: id } });
};

module.exports = {
  createStatusCeoSuggestion,
  getAllStatusCeoSuggestions,
  getStatusCeoSuggestionById,
  updateStatusCeoSuggestion,
  deleteStatusCeoSuggestion
};
