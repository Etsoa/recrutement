const { DataTypes } = require('sequelize');
const db = require('../config/db');

const SituationMatrimoniale = db.define('SituationMatrimoniale', {
  id_situation: {
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
  timestamps: false
});

module.exports = SituationMatrimoniale;
