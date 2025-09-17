const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Candidat = require('./candidatsModel');
const Unite = require('./unitesModel');

const UniteEntretien = db.define('UniteEntretien', {
  id_unite_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  id_unite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unite,
      key: 'id_unite'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_entretien: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'unite_entretiens',
  timestamps: true
});

// Associations
UniteEntretien.belongsTo(Candidat, { foreignKey: 'id_candidat' });
UniteEntretien.belongsTo(Unite, { foreignKey: 'id_unite' });

module.exports = UniteEntretien;
