const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhEntretien = require('./rhEntretiensModel');

const ScoreRhEntretien = db.define('ScoreRhEntretien', {
  id_score_rh_entretien: {
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
  date_score: {
    type: DataTypes.DATE,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'score_rh_entretiens',
  timestamps: true
});

// Associations
ScoreRhEntretien.belongsTo(RhEntretien, { foreignKey: 'id_rh_entretien' });

module.exports = ScoreRhEntretien;
