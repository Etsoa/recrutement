const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Tiers = require('./tiers');
const Langue = require('./langues');

const LangueTiers = db.define('LangueTiers', {
  id_langue_tiers: {
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
  id_langue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Langue,
      key: 'id_langue'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'langue_tiers',
  timestamps: false
});

// Associations
LangueTiers.belongsTo(Tiers, { foreignKey: 'id_tiers' });
LangueTiers.belongsTo(Langue, { foreignKey: 'id_langue' });

module.exports = LangueTiers;
