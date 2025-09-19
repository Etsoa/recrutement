const { DataTypes } = require('sequelize');
const db = require('../config/db');

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
      model: 'annonces',
      key: 'id_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
  }
}, {
  tableName: 'qcm_annonces',
  timestamps: false
});

// Associations avec lazy loading
QcmAnnonce.associate = function(models) {
  QcmAnnonce.belongsTo(models.Annonce, { foreignKey: 'id_annonce' });
  QcmAnnonce.belongsTo(models.QuestionQcm, { foreignKey: 'id_question_qcm', targetKey: 'id_question' });
};

module.exports = QcmAnnonce;
