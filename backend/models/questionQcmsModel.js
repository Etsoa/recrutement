const { DataTypes } = require('sequelize');
const db = require('../config/db');

const QuestionQcm = db.define('QuestionQcm', {
  id_question: {
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
  timestamps: false
});

module.exports = QuestionQcm;
