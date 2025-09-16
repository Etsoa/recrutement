const { DataTypes } = require('sequelize');
const db = require('../config/db');

const SituationMatrimoniale = db.define('SituationMatrimoniale', {
  id_situation_matrimoniale: {
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
  tableName: 'situation_matrimoniales',
  timestamps: true
});

module.exports = SituationMatrimoniale;
