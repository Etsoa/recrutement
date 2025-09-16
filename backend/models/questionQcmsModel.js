const { DataTypes } = require('sequelize');
const db = require('../config/db');

const QuestionQCM = db.define('QuestionQCM', {
  id_question_qcm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  intitule: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'question_qcms',
  timestamps: true
});

module.exports = QuestionQCM;
