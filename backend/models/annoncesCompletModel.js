// models/annoncesCompletModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const AnnonceComplet = db.define('AnnonceComplet', {
  id_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  age_min: {
    type: DataTypes.INTEGER
  },
  age_max: {
    type: DataTypes.INTEGER
  },
  genre: {
    type: DataTypes.STRING
  },
  ville: {
    type: DataTypes.STRING
  },
  poste: {
    type: DataTypes.STRING
  },
  unite: {
    type: DataTypes.STRING
  },
  unite_mdp: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'view_annonces_complet', // le nom de ta view
  timestamps: false
});

module.exports = AnnonceComplet;
