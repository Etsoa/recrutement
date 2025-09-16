const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Poste = require('./postes');
const Ville = require('./villes');
const Genre = require('./genres');
const SituationMatrimoniale = require('./situation_matrimoniales');

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
  },
  nombre_enfant: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_situation_matrimoniale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SituationMatrimoniale,
      key: 'id_situation_matrimoniale'
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
Annonce.belongsTo(SituationMatrimoniale, { foreignKey: 'id_situation_matrimoniale' });

module.exports = Annonce;
