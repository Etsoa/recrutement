const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Employe = require('./employesModel');
const Poste = require('./postes');

const HistoriquePosteEmploye = db.define('HistoriquePosteEmploye', {
  id_historique_poste_employe: {
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
  tableName: 'historique_poste_employes',
  timestamps: false
});

// Associations
HistoriquePosteEmploye.belongsTo(Poste, { foreignKey: 'id_poste' });
HistoriquePosteEmploye.belongsTo(Employe, { foreignKey: 'id_employe' });

module.exports = HistoriquePosteEmploye;
