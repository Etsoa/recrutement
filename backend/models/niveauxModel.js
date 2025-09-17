const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Niveau = db.define('Niveau', {
  id_niveau: {
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
  tableName: 'niveaux',
  timestamps: true
});

module.exports = Niveau;
