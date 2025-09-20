const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Unite = require('./unitesModel');

const Poste = db.define('Poste', {
  id_poste: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valeur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_unite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unite,
      key: 'id_unite'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'postes',
  timestamps: false
});

Poste.belongsTo(Unite, { foreignKey: 'id_unite' });

module.exports = Poste;
