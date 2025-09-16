const { DataTypes } = require('sequelize');
const db = require('../config/db');

const RhEntretiens = require('./rhEntretiensModel');
const TypeStatusEntretien = require('./typeStatusEntretiensModel');

const StatusRhEntretiens = db.define('StatusRhEntretiens', {
  id_status_rh_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rh_entretien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RhEntretiens,
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
StatusRhEntretiens.belongsTo(RhEntretiens, { foreignKey: 'id_rh_entretien' });
StatusRhEntretiens.belongsTo(TypeStatusEntretien, { foreignKey: 'id_type_status_entretien' });

module.exports = StatusRhEntretiens;
