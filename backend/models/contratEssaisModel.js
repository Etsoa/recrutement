const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Employe = require('./employesModel');

const ContratEssai = db.define('ContratEssai', {
  id_contrat_essai: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER, // durée en mois
    allowNull: false
  }
}, {
  tableName: 'contrat_essais',
  timestamps: false
});

// Associations
ContratEssai.belongsTo(Employe, { foreignKey: 'id_employe' });

module.exports = ContratEssai;
