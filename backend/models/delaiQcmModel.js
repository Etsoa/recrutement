const { DataTypes } = require('sequelize');
const db = require('../config/db');

const DelaiQcm = db.define('DelaiQcm', {
  id_delai_qcm: {
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
  tableName: 'delai_qcm',
  timestamps: true
});

module.exports = DelaiQcm;
