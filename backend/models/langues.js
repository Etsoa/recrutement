const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Langue = db.define('Langue', {
  id_langue: {
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
  tableName: 'langues',
  timestamps: true
});

module.exports = Langue;
