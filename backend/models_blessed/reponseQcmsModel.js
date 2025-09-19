const { DataTypes } = require('sequelize');
const db = require('../config/db');
const QuestionQcm = require('./questionQcmsModel'); // On importe le modèle QuestionQCM

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
  timestamps: false
});

// Association Sequelize
ReponseQcm.belongsTo(QuestionQcm, { foreignKey: 'id_question_qcm' });

module.exports = ReponseQcm;
