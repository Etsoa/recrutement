const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Genre = db.define('Genre', {
  id_genre: {
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
  tableName: 'genres',
  timestamps: true
});

module.exports = Genre;
