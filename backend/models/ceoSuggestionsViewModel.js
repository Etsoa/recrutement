// models/CeoSuggestionViewModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const CeoSuggestionView = db.define('CeoSuggestionView', {
  id_ceo_suggestion: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_rh_entretien: DataTypes.INTEGER,
  id_candidat: DataTypes.INTEGER,
  nom_candidat: DataTypes.STRING,
  prenom_candidat: DataTypes.STRING,
  date_suggestion: DataTypes.DATE,
  id_type_status_suggestion: DataTypes.INTEGER,
  statut: DataTypes.STRING,
  statut_date: DataTypes.DATE
}, {
  tableName: 'ceo_suggestions_view',
  timestamps: false
});

module.exports = CeoSuggestionView;
