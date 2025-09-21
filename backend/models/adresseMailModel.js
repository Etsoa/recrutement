const { DataTypes } = require('sequelize');
const db = require('../config/db');

const AdresseMail= db.define('AdresseMail', {
  valeur: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true  // Définir valeur comme clé primaire
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'adresse_mail',
  timestamps: false
});

module.exports = AdresseMail;
