const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ScoreMinimumEntretien = db.define('ScoreMinimumEntretien', {
  valeur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'score_minimum_entretien',
  timestamps: false
});

module.exports = ScoreMinimumEntretien;
