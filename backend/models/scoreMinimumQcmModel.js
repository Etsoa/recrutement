const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ScoreMinimumQcm = db.define('ScoreMinimumQcm', {
  valeur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'score_minimum_qcm',
  timestamps: false
});

module.exports = ScoreMinimumQcm;
