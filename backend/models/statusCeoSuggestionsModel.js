const { DataTypes } = require('sequelize');
const db = require('../config/db');

const CeoSuggestion = require('./ceoSuggestionsModel');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');

const StatusCeoSuggestion = db.define('StatusCeoSuggestion', {
  id_status_ceo_suggestion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_ceo_suggestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CeoSuggestion,
      key: 'id_ceo_suggestion'
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
  tableName: 'status_ceo_suggestions',
  timestamps: false
});

// Associations
StatusCeoSuggestion.belongsTo(CeoSuggestion, { foreignKey: 'id_ceo_suggestion' });
StatusCeoSuggestion.belongsTo(TypeStatusSuggestion, { foreignKey: 'id_type_status_suggestion' });

module.exports = StatusCeoSuggestion;
