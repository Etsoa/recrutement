const { DataTypes } = require('sequelize');
const db = require('../config/db');

const HorairesOuvres = db.define('HorairesOuvres', {
  id_horaire_ouvre: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  heure_debut: {
    type: DataTypes.TIME,
    allowNull: false
  },
  heure_fin: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'horaires_ouvres',
  timestamps: false
});

module.exports = HorairesOuvres;