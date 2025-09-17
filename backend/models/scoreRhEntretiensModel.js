const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhEntretiens = require('./rhEntretiensModel');

const ScoreRhEntretiens = db.define('ScoreRhEntretiens', {
  id_score_rh_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rh_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RhEntretiens,
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
ScoreRhEntretiens.belongsTo(RhEntretiens, { foreignKey: 'id_rh_entretien' });

module.exports = ScoreRhEntretiens;
