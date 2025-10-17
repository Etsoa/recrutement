const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Poste = require('./postesModel');
const Ville = require('./villesModel');
const Genre = require('./genresModel');
const Unite = require('./unitesModel');
const NiveauFiliereAnnonce = require('./niveauFiliereAnnoncesModel');
const LangueAnnonce = require('./langueAnnoncesModel');
const Langue = require('./languesModel');
const QualiteAnnonce = require('./qualiteAnnoncesModel');
const Qualite = require('./qualitesModel');
const ExperienceAnnonce = require('./experienceAnnoncesModel');
const Domaine = require('./domainesModel');

const Annonce = db.define('Annonce', {
  id_annonce: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_poste: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Poste,
      key: 'id_poste'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_ville: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ville,
      key: 'id_ville'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  age_min: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  age_max: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_genre: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: 'id_genre'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'annonces',
  timestamps: false
});

// Associations Sequelize
Annonce.belongsTo(Poste, { foreignKey: 'id_poste', as: 'Poste' });
Annonce.belongsTo(Ville, { foreignKey: 'id_ville', as: 'Ville' });
Annonce.belongsTo(Genre, { foreignKey: 'id_genre', as: 'Genre' });

Annonce.hasMany(NiveauFiliereAnnonce, { foreignKey: 'id_annonce', as: 'niveauFiliereAnnonces' });
NiveauFiliereAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce', as: 'Annonce' });

Annonce.hasMany(LangueAnnonce, { foreignKey: 'id_annonce', as: 'Langues' });
LangueAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });

LangueAnnonce.belongsTo(Langue, { foreignKey: 'id_langue', as: 'Langue' });

Annonce.hasMany(QualiteAnnonce, { foreignKey: 'id_annonce', as: 'Qualites' });
QualiteAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });

QualiteAnnonce.belongsTo(Qualite, { foreignKey: 'id_qualite', as: 'Qualite' });

Annonce.hasMany(ExperienceAnnonce, { foreignKey: 'id_annonce', as: 'Experiences' });
ExperienceAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });

ExperienceAnnonce.belongsTo(Domaine, { foreignKey: 'id_domaine', as: 'Domaine' });

module.exports = Annonce;
