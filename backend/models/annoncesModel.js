const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Poste = require('./postesModel');
const Ville = require('./villesModel');
const Genre = require('./genres');

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
  timestamps: true
});

// Associations Sequelize
Annonce.belongsTo(Poste, { foreignKey: 'id_poste' });
Annonce.belongsTo(Ville, { foreignKey: 'id_ville' });
Annonce.belongsTo(Genre, { foreignKey: 'id_genre' });

module.exports = Annonce;
