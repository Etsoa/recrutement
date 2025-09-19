const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ScoreMinimumEntretien = db.define('ScoreMinimumEntretien', {
  id_score_minimum_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valeur: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'score_minimum_entretien',
  timestamps: false
});

module.exports = ScoreMinimumEntretien;
