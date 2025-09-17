const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhSuggestion = require('./rhSuggestionsModel');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');

const StatusRhSuggestion = db.define('StatusRhSuggestion', {
  id_status_rh_suggestion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rh_suggestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RhSuggestion,
      key: 'id_rh_suggestion'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_type_status_suggestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeStatusSuggestion,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_changement: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'status_rh_suggestions',
  timestamps: true
});

// Associations
StatusRhSuggestion.belongsTo(RhSuggestion, { foreignKey: 'id_rh_suggestion' });
StatusRhSuggestion.belongsTo(TypeStatusSuggestion, { foreignKey: 'id_type_status_suggestion' });

module.exports = StatusRhSuggestion;
