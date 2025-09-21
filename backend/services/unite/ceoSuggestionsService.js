const CeoSuggestion = require('../../models/ceoSuggestionsModel');

// Créer une nouvelle suggestion CEO
const createCeoSuggestion = async (data) => {
  return await CeoSuggestion.create(data);
};

// Récupérer toutes les suggestions CEO
const getAllCeoSuggestions = async () => {
  return await CeoSuggestion.findAll();
};

// Récupérer une suggestion CEO par ID
const getCeoSuggestionById = async (id) => {
  return await CeoSuggestion.findByPk(id);
};

// Mettre à jour une suggestion CEO
const updateCeoSuggestion = async (id, data) => {
  return await CeoSuggestion.update(data, { where: { id_ceo_suggestion: id } });
};

// Supprimer une suggestion CEO
const deleteCeoSuggestion = async (id) => {
  return await CeoSuggestion.destroy({ where: { id_ceo_suggestion: id } });
};

module.exports = {
  createCeoSuggestion,
  getAllCeoSuggestions,
  getCeoSuggestionById,
  updateCeoSuggestion,
  deleteCeoSuggestion
};
