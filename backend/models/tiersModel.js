const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Ville = require('./villesModel');
const Genre = require('./genresModel');
const SituationMatrimoniale = require('./situationMatrimonialesModel');

const Tiers = db.define('Tiers', {
  id_tiers: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_naissance: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true
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
  id_genre: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: 'id_genre'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_situation_matrimoniale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SituationMatrimoniale,
      key: 'id_situation'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  nombre_enfants: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'tiers',
  timestamps: false
});

// Associations
Tiers.belongsTo(Ville, { foreignKey: 'id_ville' });
Tiers.belongsTo(Genre, { foreignKey: 'id_genre' });
Tiers.belongsTo(SituationMatrimoniale, { foreignKey: 'id_situation_matrimoniale' });

module.exports = Tiers;
