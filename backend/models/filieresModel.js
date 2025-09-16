const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Filiere = db.define('Filiere', {
  id_filiere: {
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
  tableName: 'filieres',
  timestamps: true
});

module.exports = Filiere;
