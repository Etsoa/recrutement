const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Qualite = db.define('Qualite', {
  id_qualite: {
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
  tableName: 'qualites',
  timestamps: true
});

module.exports = Qualite;
