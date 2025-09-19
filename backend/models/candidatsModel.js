const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Candidat = db.define('Candidat', {
  id_candidat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_tiers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tiers',
      key: 'id_tiers'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
  cv: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'candidats',
  timestamps: false
});

// Associations avec lazy loading
Candidat.associate = function(models) {
  Candidat.belongsTo(models.Tiers, { foreignKey: 'id_tiers' });
  Candidat.belongsTo(models.Annonce, { foreignKey: 'id_annonce' });
};

module.exports = Candidat;
