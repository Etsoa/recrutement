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

// Associations
ReponseQcm.belongsTo(QuestionQcm, { foreignKey: 'id_question_qcm' });

// Reverse association
QuestionQcm.hasMany(ReponseQcm, { foreignKey: 'id_question_qcm' });

module.exports = ReponseQcm;
