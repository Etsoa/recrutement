const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Candidat = require('./candidats');
const Unite = require('./unites');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');

const RhSuggestions = db.define('RhSuggestions', {
  id_rh_suggestion: {
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
  id_unite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unite,
      key: 'id_unite'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'rh_suggestions',
  timestamps: true
});

// Associations
RhSuggestions.belongsTo(Candidat, { foreignKey: 'id_candidat' });
RhSuggestions.belongsTo(TypeStatusSuggestion, { foreignKey: 'id_statut_suggestion' });
RhSuggestions.belongsTo(Unite, { foreignKey: 'id_unite' });

module.exports = RhSuggestions;
