const { DataTypes } = require('sequelize');
const db = require('../config/db');

const DelaiEntretien = db.define('DelaiEntretien', {
  valeur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'delai_entretien',
  timestamps: false
});

module.exports = DelaiEntretien;
