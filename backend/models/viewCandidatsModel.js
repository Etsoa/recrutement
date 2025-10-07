// models/viewCandidatsModel.js - Modèle conforme aux scripts SQL
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ViewCandidat = db.define(
  'ViewCandidat',
  {
    id_candidat: { 
      type: DataTypes.INTEGER, 
      primaryKey: true 
    },
    id_tiers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_annonce: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nombre_enfants: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    situation_matrimoniale: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age_min: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    age_max: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_unite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    poste: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unite_nom: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'v_candidats', // Vue restaurée via create_v_candidats.sql
    timestamps: false,
    // Vue en lecture seule
    hooks: {
      beforeCreate: () => {
        throw new Error('Cannot insert into a view');
      },
      beforeUpdate: () => {
        throw new Error('Cannot update a view');
      },
      beforeDestroy: () => {
        throw new Error('Cannot delete from a view');
      }
    }
  }
);

module.exports = ViewCandidat;
