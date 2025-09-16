const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Ville = db.define('Ville', {
  id_ville: {
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
  tableName: 'villes',
  timestamps: true
});

module.exports = Ville;
