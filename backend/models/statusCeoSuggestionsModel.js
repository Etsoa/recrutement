const { DataTypes } = require('sequelize');
const db = require('../config/db');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');

const StatusCeoSuggestion = db.define('StatusCeoSuggestion', {
  id_status_ceo_suggestion: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  id_ceo_suggestion: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_type_status_suggestion: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
      model: TypeStatusSuggestion, 
      key: 'id_type_status_suggestion' 
    } 
  },
  date_changement: { 
    type: DataTypes.DATE, 
    allowNull: false 
  }
}, {
  tableName: 'status_ceo_suggestions',
  timestamps: false
});

StatusCeoSuggestion.belongsTo(TypeStatusSuggestion, { 
  foreignKey: 'id_type_status_suggestion',
  as: 'TypeStatusSuggestion' // ⚡ l’alias exact
});

module.exports = StatusCeoSuggestion;
