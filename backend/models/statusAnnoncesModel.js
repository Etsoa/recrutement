const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const TypeStatusAnnonce = require('./typeStatusAnnoncesModel');
const Unite = require('./unitesModel');

const StatusAnnonce = db.define('StatusAnnonce', {
  id_status_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Annonce,
      key: 'id_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_changement: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_type_status_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeStatusAnnonce,
      key: 'id_type_status'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
  tableName: 'status_annonces',
  timestamps: false
});

// Associations
StatusAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
StatusAnnonce.belongsTo(TypeStatusAnnonce, { foreignKey: 'id_type_status_annonce' });
StatusAnnonce.belongsTo(Unite, { foreignKey: 'id_unite' });

module.exports = StatusAnnonce;
