const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Candidat = require('./candidats');
const Unite = require('./unites');

const UniteEntretiens = db.define('UniteEntretiens', {
  id_unite_entretiens: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_unite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Unite,
      key: 'id_unite'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_candidat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidat,
      key: 'id_candidat'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  date_entretien: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER, // durée en minutes
    allowNull: false
  }
}, {
  tableName: 'unite_entretiens',
  timestamps: true
});

// Associations
UniteEntretiens.belongsTo(Unite, { foreignKey: 'id_unite' });
UniteEntretiens.belongsTo(Candidat, { foreignKey: 'id_candidat' });

module.exports = UniteEntretiens;
