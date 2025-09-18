const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Candidat = require('./candidats');
const Employe = require('./employesModel');

const EnvoiQcmCandidat = db.define('EnvoiQcmCandidat', {
  id_envoi_qcm_candidat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_candidat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidat,
      key: 'id_candidat'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  lien: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
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
  date_envoi: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'envoi_qcm_candidats',
  timestamps: false
});

// Associations
EnvoiQcmCandidat.belongsTo(Candidat, { foreignKey: 'id_candidat' });
EnvoiQcmCandidat.belongsTo(Employe, { foreignKey: 'id_employe' });

module.exports = EnvoiQcmCandidat;
