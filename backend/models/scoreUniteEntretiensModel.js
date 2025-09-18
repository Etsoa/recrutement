const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UniteEntretien = require('./uniteEntretiensModel');

const ScoreUniteEntretien = db.define('ScoreUniteEntretien', {
  id_score_unite_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_unite_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UniteEntretien,
      key: 'id_unite_entretiens'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_score: {
    type: DataTypes.DATE,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'score_unite_entretiens',
  timestamps: false
});

// Associations
ScoreUniteEntretien.belongsTo(UniteEntretien, { foreignKey: 'id_unite_entretien' });

module.exports = ScoreUniteEntretien;
