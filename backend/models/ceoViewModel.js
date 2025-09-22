const  { DataTypes } = require('sequelize');
const db = require('../config/db');

const CeoView = db.define('vue_ceo', {
    id_employe: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING
    },
    email: {
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
    },
    id_type_status_employe: {
        type: DataTypes.INTEGER
    },
    type_status_employe: {
        type: DataTypes.STRING
    }
}, {
    tableName : 'vue_ceo',
    timestamps: false
});

module.exports = CeoView;