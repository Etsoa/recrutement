const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Employe = require('./employesModel');
const TypeStatusEmploye = require('./typeStatusEmployesModel');

const StatusEmploye = db.define('StatusEmploye', {
  id_status_employe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_type_status_employe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeStatusEmploye,
      key: 'id_type_status_employe'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_employe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employe,
      key: 'id_employe'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_changement: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'status_employes',
  timestamps: false
});

// Associations
StatusEmploye.belongsTo(Employe, { foreignKey: 'id_employe' });
StatusEmploye.belongsTo(TypeStatusEmploye, { foreignKey: 'id_type_status_employe' });

module.exports = StatusEmploye;
