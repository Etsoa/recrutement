const { DataTypes } = require('sequelize');
const db = require('../config/db');

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
      model: 'postes',
      key: 'id_poste'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_ville: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'villes',
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
      model: 'genres',
      key: 'id_genre'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'annonces',
  timestamps: false
});

// Associations avec lazy loading pour éviter les dépendances circulaires
Annonce.associate = function(models) {
  // Relations belongsTo
  Annonce.belongsTo(models.Poste, { foreignKey: 'id_poste' });
  Annonce.belongsTo(models.Ville, { foreignKey: 'id_ville' });
  Annonce.belongsTo(models.Genre, { foreignKey: 'id_genre' });
  
  // Relations hasMany
  Annonce.hasMany(models.StatusAnnonce, { foreignKey: 'id_annonce' });
  Annonce.hasMany(models.NiveauFiliereAnnonce, { foreignKey: 'id_annonce' });
  Annonce.hasMany(models.LangueAnnonce, { foreignKey: 'id_annonce' });
  Annonce.hasMany(models.QualiteAnnonce, { foreignKey: 'id_annonce' });
  Annonce.hasMany(models.ExperienceAnnonce, { foreignKey: 'id_annonce' });
  Annonce.hasMany(models.QcmAnnonce, { foreignKey: 'id_annonce' });
  Annonce.hasMany(models.Candidat, { foreignKey: 'id_annonce' });
};

module.exports = Annonce;
