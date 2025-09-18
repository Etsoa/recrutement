const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Poste = require('./postesModel');
const Tiers = require('./tiersModel');
const TypeStatusEmploye = require('./typeStatusEmployesModel');

const Employe = db.define('Employe', {
  id_employe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_poste: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Poste,
      key: 'id_poste'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_tiers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tiers,
      key: 'id_tiers'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_type_status_employes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeStatusEmploye,
      key: 'id_type_status_employe'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'employes',
  timestamps: false
});

// Associations
Employe.belongsTo(Poste, { foreignKey: 'id_poste' });
Employe.belongsTo(Tiers, { foreignKey: 'id_tiers' });
Employe.belongsTo(TypeStatusEmploye, { foreignKey: 'id_type_status_employes' });

module.exports = Employe;
