const { DataTypes } = require('sequelize');
const db = require('../config/db');

const PourcentageMinimumCv = db.define('PourcentageMinimumCv', {
  valeur: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'pourcentage_minimum_cv',
  timestamps: false
});

module.exports = PourcentageMinimumCv;
