const UniteEntretien = require('../models/uniteEntretiensModel');

// Créer un nouvel entretien
const createUniteEntretien = async (data) => {
  return await UniteEntretien.create(data);
};

// Récupérer tous les entretiens
const getAllUniteEntretiens = async () => {
  return await UniteEntretien.findAll();
};

// Récupérer un entretien par ID
const getUniteEntretienById = async (id) => {
  return await UniteEntretien.findByPk(id);
};

// Mettre à jour un entretien
const updateUniteEntretien = async (id, data) => {
  return await UniteEntretien.update(data, { where: { id_unite_entretien: id } });
};

// Supprimer un entretien
const deleteUniteEntretien = async (id) => {
  return await UniteEntretien.destroy({ where: { id_unite_entretien: id } });
};

module.exports = {
  createUniteEntretien,
  getAllUniteEntretiens,
  getUniteEntretienById,
  updateUniteEntretien,
  deleteUniteEntretien
};
