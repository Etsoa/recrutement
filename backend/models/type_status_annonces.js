const { DataTypes } = require('sequelize');
const db = require('../config/db');

const TypeStatusAnnonce = db.define('TypeStatusAnnonce', {
  id_type_status_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valeur: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'type_status_annonces',
  timestamps: true
});

module.exports = TypeStatusAnnonce;
