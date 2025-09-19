const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const QuestionQCM = require('./questionQcmsModel');

const QcmAnnonce = db.define('QcmAnnonce', {
  id_qcm_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Annonce,
      key: 'id_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_question_qcm: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QuestionQCM,
      key: 'id_question_qcm'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'qcm_annonces',
  timestamps: false
});

// Associations
QcmAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
QcmAnnonce.belongsTo(QuestionQCM, { foreignKey: 'id_question_qcm' });

module.exports = QcmAnnonce;
