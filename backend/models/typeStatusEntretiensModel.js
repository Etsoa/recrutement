const { DataTypes } = require('sequelize');
const db = require('../config/db');

const TypeStatusEntretien = db.define('TypeStatusEntretien', {
  id_type_status_entretien: {
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
  tableName: 'type_status_entretiens',
  timestamps: true
});

module.exports = TypeStatusEntretien;
