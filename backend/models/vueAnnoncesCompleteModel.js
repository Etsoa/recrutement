// models/vueAnnoncesCompleteModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const VueAnnoncesComplete = db.define('vue_annonces_complete', {
    id_annonce: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    poste: DataTypes.STRING,
    ville: DataTypes.STRING,
    age_min: DataTypes.INTEGER,
    age_max: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    type_status: DataTypes.STRING,
    date_changement: DataTypes.DATE,
    unite_nom: DataTypes.STRING,
    filieres_niveaux: DataTypes.STRING,
    langues: DataTypes.STRING,
    qualites: DataTypes.STRING,
    experiences: DataTypes.STRING
}, {
    tableName: 'vue_annonces_complete',
    timestamps: false, // car c'est une vue, pas de createdAt/updatedAt
});

module.exports = VueAnnoncesComplete;
