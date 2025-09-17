const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Domaine = db.define('Domaine', {
  id_domaine: {
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
  tableName: 'domaines',
  timestamps: true
});

module.exports = Domaine;
