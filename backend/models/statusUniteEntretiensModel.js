const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UniteEntretien = require('./uniteEntretiensModel.js');
const TypeStatusEntretien = require('./typeStatusEntretiensModel');

const StatusUniteEntretien = db.define('StatusUniteEntretien', {
  id_status_unite_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_unite_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UniteEntretien,
      key: 'id_unite_entretien'
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
  timestamps: false
});

// Associations
StatusUniteEntretien.belongsTo(UniteEntretien, { foreignKey: 'id_unite_entretien' });
StatusUniteEntretien.belongsTo(TypeStatusEntretien, { foreignKey: 'id_type_status_entretien' });

module.exports = StatusUniteEntretien;
