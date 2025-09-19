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

// Associations avec lazy loading
QuestionQcm.associate = function(models) {
  QuestionQcm.hasMany(models.ReponseQcm, { foreignKey: 'id_question_qcm' });
  QuestionQcm.hasMany(models.QcmAnnonce, { foreignKey: 'id_question_qcm' });
};

module.exports = QuestionQcm;
