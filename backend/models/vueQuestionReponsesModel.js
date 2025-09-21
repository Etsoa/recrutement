// models/vueDetailQcmModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const VueDetailQcm = db.define('vue_detail_qcm', {
    id_annonce: DataTypes.INTEGER,
    id_qcm_annonce: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_question_qcm: DataTypes.INTEGER,
    question: DataTypes.STRING,
    id_reponse_qcm: DataTypes.INTEGER,
    reponse: DataTypes.STRING,
    modalite: DataTypes.BOOLEAN
}, {
    tableName: 'vue_detail_qcm',
    timestamps: false
});

module.exports = VueDetailQcm;
