const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UniteEntretien = require('./uniteEntretiensModel');
const Candidat = require('./candidatsModel');

const RhSuggestion = db.define('RhSuggestion', {
  id_rh_suggestion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_unite_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UniteEntretien,
      key: 'id_unite_entretien'
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
  date_suggestion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'rh_suggestions',
  timestamps: false
});

// Associations
RhSuggestion.belongsTo(UniteEntretien, { foreignKey: 'id_unite_entretien', as: 'entretien' });
RhSuggestion.belongsTo(Candidat, { foreignKey: 'id_candidat', as: 'candidat' });


module.exports = RhSuggestion;
