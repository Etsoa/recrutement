const { DataTypes } = require('sequelize');
const db = require('../config/db');

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
      model: 'question_qcms',
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

// Associations avec lazy loading
ReponseQcm.associate = function(models) {
  ReponseQcm.belongsTo(models.QuestionQcm, { foreignKey: 'id_question_qcm', targetKey: 'id_question' });
};

module.exports = ReponseQcm;
