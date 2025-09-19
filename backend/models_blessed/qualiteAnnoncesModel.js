const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const Qualite = require('./qualitesModel');

const QualiteAnnonce = db.define('QualiteAnnonce', {
  id_qualite_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  tableName: 'qualite_annonces',
  timestamps: false
});

// Associations
QualiteAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
QualiteAnnonce.belongsTo(Qualite, { foreignKey: 'id_qualite' });

module.exports = QualiteAnnonce;
