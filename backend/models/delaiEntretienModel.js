const { DataTypes } = require('sequelize');
const db = require('../config/db');

const DelaiEntretien = db.define('DelaiEntretien', {
  id_delai_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valeur: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'delai_entretien',
  timestamps: true
});

module.exports = DelaiEntretien;
