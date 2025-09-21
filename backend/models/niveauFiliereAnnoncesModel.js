const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const Filiere = require('./filieresModel');
const Niveau = require('./niveauxModel');

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
      model: Annonce,
      key: 'id_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_filiere: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Filiere,
      key: 'id_filiere'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_niveau: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Niveau,
      key: 'id_niveau'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'niveau_filiere_annonces',
  timestamps: false
});

// Associations
NiveauFiliereAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
NiveauFiliereAnnonce.belongsTo(Filiere, { foreignKey: 'id_filiere' });
NiveauFiliereAnnonce.belongsTo(Niveau, { foreignKey: 'id_niveau' });

// Reverse associations
Annonce.hasMany(NiveauFiliereAnnonce, { foreignKey: 'id_annonce' });

module.exports = NiveauFiliereAnnonce;
