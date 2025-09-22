const StatusUniteEntretien = require('../models/statusUniteEntretiensModel');

// Créer un nouveau status
const createStatusUniteEntretien = async (data) => {
  return await StatusUniteEntretien.create(data);
};

// Récupérer tous les status
const getAllStatusUniteEntretiens = async () => {
  return await StatusUniteEntretien.findAll();
};

// Récupérer un status par ID
const getStatusUniteEntretienById = async (id) => {
  return await StatusUniteEntretien.findByPk(id);
};

// Mettre à jour un status
const updateStatusUniteEntretien = async (id, data) => {
  return await StatusUniteEntretien.update(data, { where: { id_status_unite_entretien: id } });
};

// Supprimer un status
const deleteStatusUniteEntretien = async (id) => {
  return await StatusUniteEntretien.destroy({ where: { id_status_unite_entretien: id } });
};

module.exports = {
  createStatusUniteEntretien,
  getAllStatusUniteEntretiens,
  getStatusUniteEntretienById,
  updateStatusUniteEntretien,
  deleteStatusUniteEntretien
};
