const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Tiers = require('./tiers');
const Annonce = require('./annonces');

const Candidat = db.define('Candidat', {
  id_candidat: {
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
  id_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Annonce,
      key: 'id_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'candidats',
  timestamps: true
});

// Associations
Candidat.belongsTo(Tiers, { foreignKey: 'id_tiers' });
Candidat.belongsTo(Annonce, { foreignKey: 'id_annonce' });

module.exports = Candidat;
