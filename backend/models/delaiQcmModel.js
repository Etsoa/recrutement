const { DataTypes } = require('sequelize');
const db = require('../config/db');

const DelaiQcm = db.define('DelaiQcm', {
  valeur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  tableName: 'delai_qcm',
  timestamps: false
});

module.exports = DelaiQcm;
