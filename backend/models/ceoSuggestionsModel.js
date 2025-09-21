const { DataTypes } = require('sequelize');
const db = require('../config/db');
const RhEntretien = require('./rhEntretiensModel');
const Candidat = require('./candidatsModel');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');
const StatusCeoSuggestion = require('./statusCeoSuggestionsModel'); // pas de belongsTo ici

const CeoSuggestion = db.define('CeoSuggestion', {
  id_ceo_suggestion: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  id_rh_entretien: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
    model: RhEntretien, 
    key: 'id_rh_entretien' } 
  },
  id_candidat: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
    model: Candidat, 
    key: 'id_candidat' } 
  },
  id_type_status_suggestion: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
    model: TypeStatusSuggestion, 
    key: 'id_type_status_suggestion' } 
  },
  date_suggestion: { 
    type: DataTypes.DATE, 
    allowNull: false 
  }
}, {
  tableName: 'ceo_suggestions',
  timestamps: false
});

CeoSuggestion.belongsTo(RhEntretien, { foreignKey: 'id_rh_entretien' });
CeoSuggestion.belongsTo(Candidat, { foreignKey: 'id_candidat' });
CeoSuggestion.belongsTo(TypeStatusSuggestion , { foreignKey: 'id_type_status_suggestion' });

// ⚡ On ne fait pas StatusCeoSuggestion.belongsTo ici pour éviter le cercle
CeoSuggestion.hasMany(StatusCeoSuggestion, { foreignKey: 'id_ceo_suggestion', as: 'StatusCeoSuggestions' });

module.exports = CeoSuggestion;
