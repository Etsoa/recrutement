const { DataTypes } = require('sequelize');
const db = require('../config/db');

const TypeStatusEmploye = db.define('TypeStatusEmploye', {
  id_type_status_employe: {
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
  tableName: 'type_status_employes',
  timestamps: true
});

module.exports = TypeStatusEmploye;
