// models/uniteEntretiensViewModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UniteEntretiensView = db.define('UniteEntretiensView', {
  id_unite_entretien: { 
    type: DataTypes.INTEGER, 
    primaryKey: true 
  },
  date_entretien: {
    type: DataTypes.DATE
  },
  duree: {
    type: DataTypes.INTEGER
  },
  id_candidat: {
    type: DataTypes.INTEGER
  },
  nom_candidat: {
    type: DataTypes.STRING
  },
  prenom_candidat: {
    type: DataTypes.STRING
  },
  id_unite: {
    type: DataTypes.INTEGER
  },
  nom_unite: {
    type: DataTypes.STRING
  },
  unite_mdp: {
    type: DataTypes.STRING
  },
  id_type_status_entretien: {
    type: DataTypes.INTEGER
  },
  statut: {
    type: DataTypes.STRING
  },
  status_date: {
    type: DataTypes.DATE
  },
  dernier_score: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
  },
  date_dernier_score: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
}, {
  tableName: 'unite_entretiens_view',
  timestamps: false
});

module.exports = UniteEntretiensView;
