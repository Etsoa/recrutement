// backend/models/rhViewModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db'); 

const RhView = db.define('vue_rh', {
    id_employe: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    nom: {
        type: DataTypes.STRING
    },
    prenom: {
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
    },
    mot_de_passe: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'vue_rh',
    timestamps: false
});

module.exports = RhView;
