const StatusRhEntretien = require('../models/statusRhEntretiensModel');

// Créer un nouveau statut d'entretien RH
const createStatusRhEntretien = async (data) => {
  return await StatusRhEntretien.create(data);
};

// Récupérer tous les statuts d'entretiens RH
const getAllStatusRhEntretiens = async () => {
  return await StatusRhEntretien.findAll();
};

// Récupérer un statut d'entretien RH par ID
const getStatusRhEntretienById = async (id) => {
  return await StatusRhEntretien.findByPk(id);
};

// Mettre à jour un statut d'entretien RH
const updateStatusRhEntretien = async (id, data) => {
  return await StatusRhEntretien.update(data, { where: { id_status_rh_entretien: id } });
};

// Supprimer un statut d'entretien RH
const deleteStatusRhEntretien = async (id) => {
  return await StatusRhEntretien.destroy({ where: { id_status_rh_entretien: id } });
};

module.exports = {
  createStatusRhEntretien,
  getAllStatusRhEntretiens,
  getStatusRhEntretienById,
  updateStatusRhEntretien,
  deleteStatusRhEntretien
};
