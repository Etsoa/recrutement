const { DataTypes } = require('sequelize');
const db = require('../config/db');

const StatusAnnonce = db.define('StatusAnnonce', {
  id_status_annonce: {
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
  date_changement: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_type_status_annonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'type_status_annonces',
      key: 'id_type_status_annonce'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
  tableName: 'status_annonce',
  timestamps: false
});

// Associations avec lazy loading pour éviter les dépendances circulaires
StatusAnnonce.associate = function(models) {
  StatusAnnonce.belongsTo(models.Annonce, { foreignKey: 'id_annonce' });
  StatusAnnonce.belongsTo(models.TypeStatusAnnonce, { foreignKey: 'id_type_status_annonce' });
  StatusAnnonce.belongsTo(models.Unite, { foreignKey: 'id_unite' });
};

module.exports = StatusAnnonce;
