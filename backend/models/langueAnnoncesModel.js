const { DataTypes } = require('sequelize');
const db = require('../config/db');

const LangueAnnonce = db.define('LangueAnnonce', {
  id_langue_annonce: {
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
  id_langue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'langues',
      key: 'id_langue'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'langue_annonces',
  timestamps: false
});

// Associations avec lazy loading
LangueAnnonce.associate = function(models) {
  LangueAnnonce.belongsTo(models.Annonce, { foreignKey: 'id_annonce' });
  LangueAnnonce.belongsTo(models.Langue, { foreignKey: 'id_langue' });
};

module.exports = LangueAnnonce;
