const { DataTypes } = require('sequelize');
const db = require('../config/db');

const TypeStatusSuggestion = db.define('TypeStatusSuggestion', {
  id: {
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
  tableName: 'type_status_suggestions',
  timestamps: false
});

module.exports = TypeStatusSuggestion;
