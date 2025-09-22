const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Domaine = require('./domainesModel');

const ExperienceAnnonce = db.define('ExperienceAnnonce', {
  id_experience_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_annonce: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_domaine: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  nombre_annee: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'experience_annonces',
  timestamps: false
});

module.exports = ExperienceAnnonce;
