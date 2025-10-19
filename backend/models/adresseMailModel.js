const { DataTypes } = require('sequelize');
const db = require('../config/db');

const AdresseMail = db.define('AdresseMail', {
  valeur: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    allowNull: false
  },
  mot_de_passe: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'adresse_mail',
  timestamps: false
});

module.exports = AdresseMail;