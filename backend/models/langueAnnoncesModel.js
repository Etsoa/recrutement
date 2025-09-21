const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const Langue = require('./languesModel');

const LangueAnnonce = db.define('LangueAnnonce', {
  id_langue_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_annonce: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_langue: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  tableName: 'langue_annonces',
  timestamps: false
});

module.exports = LangueAnnonce;
