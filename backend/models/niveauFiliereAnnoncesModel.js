const { DataTypes } = require('sequelize');
const db = require('../config/db');

const NiveauFiliereAnnonce = db.define('NiveauFiliereAnnonce', {
  id_niveau_filiere_annonce: {
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
  id_filiere: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'filieres',
      key: 'id_filiere'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_niveau: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'niveaux',
      key: 'id_niveau'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'niveau_filiere_annonces',
  timestamps: false
});

// Associations avec lazy loading
NiveauFiliereAnnonce.associate = function(models) {
  NiveauFiliereAnnonce.belongsTo(models.Annonce, { foreignKey: 'id_annonce' });
  NiveauFiliereAnnonce.belongsTo(models.Filiere, { foreignKey: 'id_filiere' });
  NiveauFiliereAnnonce.belongsTo(models.Niveau, { foreignKey: 'id_niveau' });
};

module.exports = NiveauFiliereAnnonce;
