// models/vueStatusAnnoncesModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const VueStatusAnnonces = db.define('vue_status_annonces', {
    id_status_annonce: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    date_changement: DataTypes.DATE,
    id_annonce: DataTypes.INTEGER,
    poste: DataTypes.STRING,
    ville: DataTypes.STRING,
    age_min: DataTypes.INTEGER,
    age_max: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    type_status: DataTypes.STRING,
    unite_nom: DataTypes.STRING
}, {
    tableName: 'vue_status_annonces',
    timestamps: false // vue, pas de createdAt/updatedAt
});

module.exports = VueStatusAnnonces;
