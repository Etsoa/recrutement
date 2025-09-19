const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Poste = db.define('Poste', {
  id_poste: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valeur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_unite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'unites',
      key: 'id_unite'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'postes',
  timestamps: false
});

// Associations avec lazy loading
Poste.associate = function(models) {
  Poste.belongsTo(models.Unite, { foreignKey: 'id_unite' });
  Poste.hasMany(models.Annonce, { foreignKey: 'id_poste' });
};

Poste.belongsTo(Unite, { foreignKey: 'id_unite' });

module.exports = Poste;
