const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UniteEntretiens = require('./uniteEntretiensModel');
const Candidat = require('./candidats');

const RhEntretiens = db.define('RhEntretiens', {
  id_rh_entretien: {
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
  date_entretien: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER, // durée en minutes
    allowNull: false
  }
}, {
  tableName: 'rh_entretiens',
  timestamps: true
});

// Associations
RhEntretiens.belongsTo(UniteEntretiens, { foreignKey: 'id_unite_entretien' });
RhEntretiens.belongsTo(Candidat, { foreignKey: 'id_candidat' });

module.exports = RhEntretiens;
