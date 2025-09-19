const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhSuggestion = require('./rhSuggestionsModel');
const Candidat = require('./candidatsModel');

const RhEntretien = db.define('RhEntretien', {
  id_rh_entretien: {
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
  date_entretien: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'rh_entretiens',
  timestamps: false
});

// Associations
RhEntretien.belongsTo(RhSuggestion, { foreignKey: 'id_rh_suggestion' });
RhEntretien.belongsTo(Candidat, { foreignKey: 'id_candidat' });

module.exports = RhEntretien;
