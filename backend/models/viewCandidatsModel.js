// models/Candidat.js
const { DataTypes } = require('sequelize');
const db = require('../config/db'); // assure-toi que ce fichier exporte bien ton instance sequelize

const ViewCandidat = db.define(
  'ViewCandidat',
  {
    id_candidat: { type: DataTypes.INTEGER, primaryKey: true },
    id_tiers: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    date_naissance: DataTypes.DATE,
    age: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    situation_matrimoniale: DataTypes.STRING,
    nombre_enfants: DataTypes.INTEGER,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    cin: DataTypes.STRING,
    ville: DataTypes.STRING,
    photo: DataTypes.STRING,
    cv: DataTypes.STRING,
    id_annonce: DataTypes.INTEGER,
  },
  {
    tableName: 'v_candidats',
    timestamps: false,
  }
);

module.exports = ViewCandidat;
