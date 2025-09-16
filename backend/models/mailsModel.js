const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Mail = db.define('Mail', {
  id_mail: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  objet: {
    type: DataTypes.STRING,
    allowNull: false
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'mails',
  timestamps: true
});

module.exports = Mail;
