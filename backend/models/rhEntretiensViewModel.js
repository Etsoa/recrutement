// models/rhEntretiensViewModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhEntretiensView = db.define('RhEntretiensView', {
  id_rh_entretien: { 
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
  id_rh_suggestion: {
    type: DataTypes.INTEGER
  },
  id_unite_entretien: {
    type: DataTypes.INTEGER
  },
  date_suggestion: {
    type: DataTypes.DATE
  },
  id_type_status_entretien: {
    type: DataTypes.INTEGER
  },
  statut: {
    type: DataTypes.STRING
  },
  status_date: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'rh_entretiens_view',
  timestamps: false
});

module.exports = RhEntretiensView;
