const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhEntretien = require('./rhEntretiensModel');
const Candidat = require('./candidatsModel');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');

const CeoSuggestion = db.define('CeoSuggestion', {
  id_ceo_suggestion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rh_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RhEntretien,
      key: 'id_rh_entretien'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_candidat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidat,
      key: 'id_candidat'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_type_status_suggestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeStatusSuggestion,
      key: 'id_type_status_suggestion'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_suggestion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'ceo_suggestions',
  timestamps: false
});

// Associations
CeoSuggestion.belongsTo(RhEntretien, { foreignKey: 'id_rh_entretien' });
CeoSuggestion.belongsTo(Candidat, { foreignKey: 'id_candidat' });
CeoSuggestion.belongsTo(TypeStatusSuggestion , { foreignKey: 'id_type_status_suggestion' });

module.exports = CeoSuggestion;
