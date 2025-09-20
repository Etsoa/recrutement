// backend/models/CeoEmployeView.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const CeoEmployeView = db.define('vue_ceo_employes', {
  id_employe: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  id_tiers: {
    type: DataTypes.INTEGER
  },
  nom: {
    type: DataTypes.STRING
  },
  prenom: {
    type: DataTypes.STRING
  },
  date_naissance: {
    type: DataTypes.DATE
  },
  nombre_enfants: {
    type: DataTypes.INTEGER
  },
  contact: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  cin: {
    type: DataTypes.STRING
  },
  photo: {
    type: DataTypes.STRING
  },

  id_genre: {
    type: DataTypes.INTEGER
  },
  genre: {
    type: DataTypes.STRING
  },

  id_situation_matrimoniale: {
    type: DataTypes.INTEGER
  },
  situation_matrimoniale: {
    type: DataTypes.STRING
  },

  id_ville: {
    type: DataTypes.INTEGER
  },
  ville: {
    type: DataTypes.STRING
  },

  id_type_status_employe: {
    type: DataTypes.INTEGER
  },
  type_status_employe: {
    type: DataTypes.STRING
  },

  id_poste: {
    type: DataTypes.INTEGER
  },
  poste: {
    type: DataTypes.STRING
  },

  id_unite: {
    type: DataTypes.INTEGER
  },
  unite: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'vue_ceo_employes',
  timestamps: false
});

module.exports = CeoEmployeView;
