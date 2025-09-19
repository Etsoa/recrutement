const { DataTypes } = require('sequelize');
const db = require('../config/db');

const QualiteAnnonce = db.define('QualiteAnnonce', {
  id_qualite_annonce: {
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
  id_qualite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'qualites',
      key: 'id_qualite'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'qualite_annonces',
  timestamps: false
});

// Associations avec lazy loading
QualiteAnnonce.associate = function(models) {
  QualiteAnnonce.belongsTo(models.Annonce, { foreignKey: 'id_annonce' });
  QualiteAnnonce.belongsTo(models.Qualite, { foreignKey: 'id_qualite' });
};

module.exports = QualiteAnnonce;

module.exports = QualiteAnnonce;
