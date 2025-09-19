const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ScoreMinimumQcm = db.define('ScoreMinimumQcm', {
  id_score_minimum_qcm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valeur: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'score_minimum_qcm',
  timestamps: false
});

module.exports = ScoreMinimumQcm;
