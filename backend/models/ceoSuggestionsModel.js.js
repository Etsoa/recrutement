const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Candidat = require('./candidats');
const RhSuggestions = require('./rhSuggestionsModel');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');

const CeoSuggestions = db.define('CeoSuggestions', {
  id_ceo_suggestion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_suggestion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_candidat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidat,
      key: 'id_candidat'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_statut_suggestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeStatusSuggestion,
      key: 'id_type_status_suggestion'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_rh_suggestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RhSuggestions,
      key: 'id_rh_suggestion'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'ceo_suggestions',
  timestamps: true
});

// Associations
CeoSuggestions.belongsTo(Candidat, { foreignKey: 'id_candidat' });
CeoSuggestions.belongsTo(TypeStatusSuggestion, { foreignKey: 'id_statut_suggestion' });
CeoSuggestions.belongsTo(RhSuggestions, { foreignKey: 'id_rh_suggestion' });

module.exports = CeoSuggestions;
