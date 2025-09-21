const { DataTypes } = require('sequelize');
const db = require('../config/db');

const AdresseMail= db.define('AdresseMail', {
  valeur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'adresses_mail',
  timestamps: false
});

module.exports = AdresseMail;
