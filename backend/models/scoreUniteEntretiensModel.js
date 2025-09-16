const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UniteEntretiens = require('./uniteEntretiensModel');

const ScoreUniteEntretiens = db.define('ScoreUniteEntretiens', {
  id_score_unite_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_unite_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UniteEntretiens,
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
  timestamps: true
});

// Associations
ScoreUniteEntretiens.belongsTo(UniteEntretiens, { foreignKey: 'id_unite_entretien' });

module.exports = ScoreUniteEntretiens;
