const { DataTypes } = require('sequelize');
const db = require('../config/db'); // assure-toi que ce fichier exporte bien ton instance sequelize


const ViewCandidatsDetails = db.define('view_candidats_details', {
  id_candidat: { type: DataTypes.INTEGER, primaryKey: true },
  id_annonce: DataTypes.INTEGER,
  id_tiers: DataTypes.INTEGER,
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  date_naissance: DataTypes.DATE,
  age: DataTypes.INTEGER,
  id_genre: DataTypes.INTEGER,
  id_ville: DataTypes.INTEGER,
  id_langue: DataTypes.INTEGER,
  id_domaine: DataTypes.INTEGER,
  niveau: DataTypes.STRING,
  experience_annees: DataTypes.INTEGER
}, {
  tableName: 'view_candidats_details',
  timestamps: false,
});

module.exports = ViewCandidatsDetails;
