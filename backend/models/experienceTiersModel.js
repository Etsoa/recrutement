const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Tiers = require('./tiersModel');
const Domaine = require('./domaines');

const ExperienceTiers = db.define('ExperienceTiers', {
  id_experience_tiers: {
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
  id_domaine: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Domaine,
      key: 'id_domaine'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  nombre_annee: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'experience_tiers',
  timestamps: true
});

// Associations
ExperienceTiers.belongsTo(Tiers, { foreignKey: 'id_tiers' });
ExperienceTiers.belongsTo(Domaine, { foreignKey: 'id_domaine' });

module.exports = ExperienceTiers;
