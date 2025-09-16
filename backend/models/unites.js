const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Unite = db.define('Unite', {
  id_unite: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'unites',
  timestamps: true
});

module.exports = Unite;
