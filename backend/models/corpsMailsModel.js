const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Mail = require('./mailsModel');

const CorpsMail = db.define('CorpsMail', {
  id_corps_mail: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_mail: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Mail,
      key: 'id_mail'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  corps: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'corps_mails',
  timestamps: true
});

// Associations
CorpsMail.belongsTo(Mail, { foreignKey: 'id_mail' });

module.exports = CorpsMail;
