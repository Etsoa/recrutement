const { DataTypes } = require('sequelize');
const db = require('../config/db');

const StatusAnnonce = db.define('StatusAnnonce', {
  id_status_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_changement: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_type_status_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_unite: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'status_annonces',
  timestamps: false
});

module.exports = StatusAnnonce;
