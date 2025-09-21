const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const Qualite = require('./qualitesModel');

const QualiteAnnonce = db.define('QualiteAnnonce', {
  id_qualite_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  id_annonce: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_qualite: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  tableName: 'qualite_annonces',
  timestamps: false
});

module.exports = QualiteAnnonce;
