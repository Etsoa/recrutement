const { DataTypes } = require('sequelize');
const db = require('../config/db');

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
      model: 'envoi_qcm_candidats',
      key: 'id_envoi_qcm_candidat'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_qcm_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'qcm_annonces',
      key: 'id_qcm_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  debut: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  reponse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'reponse_qcm_candidats',
  timestamps: false
});

// Associations avec lazy loading
ReponseQcmCandidat.associate = function(models) {
  ReponseQcmCandidat.belongsTo(models.EnvoiQcmCandidat, { foreignKey: 'id_envoi_qcm_candidat' });
  ReponseQcmCandidat.belongsTo(models.QcmAnnonce, { foreignKey: 'id_qcm_annonce' });
};

module.exports = ReponseQcmCandidat;
