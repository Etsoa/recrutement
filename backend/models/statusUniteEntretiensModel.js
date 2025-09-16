const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UniteEntretiens = require('./uniteEntretiensModel');
const TypeStatusEntretien = require('./typeStatusEntretiensModel');

const StatusUniteEntretiens = db.define('StatusUniteEntretiens', {
  id_status_unite_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_unite_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UniteEntretiens,
      key: 'id_unite_entretiens'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_type_status_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeStatusEntretien,
      key: 'id_type_status_entretien'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_changement: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'status_unite_entretiens',
  timestamps: true
});

// Associations
StatusUniteEntretiens.belongsTo(UniteEntretiens, { foreignKey: 'id_unite_entretien' });
StatusUniteEntretiens.belongsTo(TypeStatusEntretien, { foreignKey: 'id_type_status_entretien' });

module.exports = StatusUniteEntretiens;
