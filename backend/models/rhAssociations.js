const RhSuggestions = require('./rhSuggestionsModel');
const StatusRhSuggestion = require('./statusRhSuggestionsModel');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');

// Relations
RhSuggestions.hasMany(StatusRhSuggestion, {
  foreignKey: 'id_rh_suggestion',
  as: 'status'
});

StatusRhSuggestion.belongsTo(RhSuggestions, {
  foreignKey: 'id_rh_suggestion'
});

StatusRhSuggestion.belongsTo(TypeStatusSuggestion, {
  foreignKey: 'id_type_status_suggestion',
  as: 'typeStatus'
});

TypeStatusSuggestion.hasMany(StatusRhSuggestion, {
  foreignKey: 'id_type_status_suggestion'
});

module.exports = {
  RhSuggestions,
  StatusRhSuggestion,
  TypeStatusSuggestion
};
