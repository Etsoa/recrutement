const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Tiers = require('./tiers');
const Qualite = require('./qualites');

const QualiteTiers = db.define('QualiteTiers', {
  id_qualite_tiers: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_tiers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tiers,
      key: 'id_tiers'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_qualite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Qualite,
      key: 'id_qualite'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'qualite_tiers',
  timestamps: false
});

// Associations
QualiteTiers.belongsTo(Tiers, { foreignKey: 'id_tiers' });
QualiteTiers.belongsTo(Qualite, { foreignKey: 'id_qualite' });

module.exports = QualiteTiers;
