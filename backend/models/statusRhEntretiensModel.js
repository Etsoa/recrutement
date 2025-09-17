const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhEntretien = require('./rhEntretiensModel');
const TypeStatusEntretien = require('./typeStatusEntretiensModel');

const StatusRhEntretien = db.define('StatusRhEntretien', {
  id_status_rh_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rh_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RhEntretien,
      key: 'id_rh_entretien'
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
  tableName: 'status_rh_entretiens',
  timestamps: true
});

// Associations
StatusRhEntretien.belongsTo(RhEntretien, { foreignKey: 'id_rh_entretien' });
StatusRhEntretien.belongsTo(TypeStatusEntretien, { foreignKey: 'id_type_status_entretien' });

module.exports = StatusRhEntretien;
