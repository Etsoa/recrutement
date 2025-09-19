const QcmAnnonce = require('../models/qcmAnnoncesModel');

const createQcmAnnonce = async (data) => {
    return await QcmAnnonce.create(data);
};

const getAllQcmAnnonces = async () => {
    return await QcmAnnonce.findAll();
};

const getQcmAnnonceById = async (id) => {
    return await QcmAnnonce.findByPk(id);
};

const getQcmAnnonceByAnnonceId = async (id_annonce) => {
  return await QcmAnnonce.findAll({ 
    where: { id_annonce } 
  });
};

const updateQcmAnnonce = async (id, data) => {
    return await QcmAnnonce.update(data, { where: { id } });
};

const deleteQcmAnnonce = async (id) => {
    return await QcmAnnonce.destroy({ where: { id } });
};

module.exports = {
    createQcmAnnonce,
    getAllQcmAnnonces,
    getQcmAnnonceById,
    getQcmAnnonceByAnnonceId,
    updateQcmAnnonce,
    deleteQcmAnnonce
};