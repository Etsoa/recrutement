const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Filiere = require('./filieres');
const Niveau = require('./niveaux');
const Tiers = require('./tiers');

const NiveauFiliereTiers = db.define('NiveauFiliereTiers', {
  id_niveau_filiere_tiers: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_filiere: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Filiere,
      key: 'id_filiere'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
  id_niveau: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Niveau,
      key: 'id_niveau'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'niveau_filiere_tiers',
  timestamps: false
});

// Associations
NiveauFiliereTiers.belongsTo(Filiere, { foreignKey: 'id_filiere' });
NiveauFiliereTiers.belongsTo(Tiers, { foreignKey: 'id_tiers' });
NiveauFiliereTiers.belongsTo(Niveau, { foreignKey: 'id_niveau' });

module.exports = NiveauFiliereTiers;
