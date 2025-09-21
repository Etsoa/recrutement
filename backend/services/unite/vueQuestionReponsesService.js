// services/vueQuestionReponsesService.js
const VueDetailQcm = require('../../models/vueQuestionReponsesModel');

// Récupérer toutes les questions et réponses pour une annonce spécifique
const getDetailQcmByAnnonceId = async (id_annonce) => {
    if (!id_annonce) throw new Error("id_annonce manquant");
    return await VueDetailQcm.findAll({
        where: { id_annonce }
    });
};

// Récupérer toutes les lignes (optionnel)
const getAllDetailQcm = async () => {
    return await VueDetailQcm.findAll();
};


module.exports = {
    getDetailQcmByAnnonceId,
    getAllDetailQcm
};
