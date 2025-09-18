const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const Langue = require('./languesModel');

const LangueAnnonce = db.define('LangueAnnonce', {
  id_langue_annonce: {
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
  tableName: 'langue_annonces',
  timestamps: false
});

// Associations
LangueAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
LangueAnnonce.belongsTo(Langue, { foreignKey: 'id_langue' });

module.exports = LangueAnnonce;
