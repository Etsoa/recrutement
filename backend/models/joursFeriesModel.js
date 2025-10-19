const { DataTypes } = require('sequelize');
const db = require('../config/db');

const JoursFeries = db.define('JoursFeries', {
  id_jour_ferie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_ferie: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'jours_feries',
  timestamps: false
});

module.exports = JoursFeries;