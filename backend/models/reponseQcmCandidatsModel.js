const { DataTypes } = require('sequelize');
const db = require('../config/db');

const EnvoiQcmCandidat = require('./envoiQcmCandidatsModel');
const QcmAnnonce = require('./qcm_annonces');

const ReponseQcmCandidat = db.define('ReponseQcmCandidat', {
  id_reponse_qcm_candidat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_envoi_qcm_candidat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EnvoiQcmCandidat,
      key: 'id_envoi_qcm_candidat'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_qcm_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QcmAnnonce,
      key: 'id_qcm_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  duree: {
    type: DataTypes.INTEGER, // durée en secondes
    allowNull: false
  }
}, {
  tableName: 'reponse_qcm_candidats',
  timestamps: false
});

// Associations
ReponseQcmCandidat.belongsTo(EnvoiQcmCandidat, { foreignKey: 'id_envoi_qcm_candidat' });
ReponseQcmCandidat.belongsTo(QcmAnnonce, { foreignKey: 'id_qcm_annonce' });

module.exports = ReponseQcmCandidat;
