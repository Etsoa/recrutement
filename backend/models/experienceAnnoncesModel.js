const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Annonce = require('./annoncesModel');
const Domaine = require('./domainesModel');

const ExperienceAnnonce = db.define('ExperienceAnnonce', {
  id_experience_annonce: {
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
  id_domaine: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Domaine,
      key: 'id_domaine'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  nombre_annee: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'experience_annonces',
  timestamps: false
});

// Associations
ExperienceAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
ExperienceAnnonce.belongsTo(Domaine, { foreignKey: 'id_domaine' });

module.exports = ExperienceAnnonce;
