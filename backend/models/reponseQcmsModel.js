const { DataTypes } = require('sequelize');
const db = require('../config/db');
const QuestionQcm = require('./questionQcmsModel');

const ReponseQcm = db.define('ReponseQcm', {
  id_reponse_qcm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_question_qcm: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QuestionQcm,
      key: 'id_question'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  reponse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modalite: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'reponse_qcms',
  timestamps: false
});

// Association directe avec QuestionQcm
ReponseQcm.belongsTo(QuestionQcm, { 
  foreignKey: 'id_question_qcm',
  as: 'QuestionQcm'
});

// Association inverse - QuestionQcm hasMany ReponseQcm
QuestionQcm.hasMany(ReponseQcm, { 
  foreignKey: 'id_question_qcm',
  as: 'ReponseQcms'
});

module.exports = ReponseQcm;
