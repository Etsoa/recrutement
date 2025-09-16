const { DataTypes } = require('sequelize');
const db = require('../config/db');
const QuestionQCM = require('./question_qcms'); // On importe le modèle QuestionQCM

const ReponseQCM = db.define('ReponseQCM', {
  id_reponse_qcm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  timestamps: true
});

// Association Sequelize
ReponseQCM.belongsTo(QuestionQCM, { foreignKey: 'id_question_qcm' });

module.exports = ReponseQCM;
