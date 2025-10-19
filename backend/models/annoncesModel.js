const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = db.define('Annonce', {
  id_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_poste: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_ville: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  age_min: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  age_max: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_genre: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'annonces',
  timestamps: false
});

module.exports = Annonce;
