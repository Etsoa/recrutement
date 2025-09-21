const { DataTypes } = require('sequelize');
const db = require('../config/db'); // ton instance Sequelize

const JoursFeries = db.define('JoursFeries', {
  id_jour_ferie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_ferie: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'jours_feries',
  timestamps: false
});

module.exports = JoursFeries;
