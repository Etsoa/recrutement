const RhEntretien = require('../../models/rhEntretiensModel');

// Créer un nouvel entretien RH
const createRhEntretien = async (data) => {
  return await RhEntretien.create(data);
};

// Récupérer tous les entretiens RH
const getAllRhEntretiens = async () => {
  return await RhEntretien.findAll();
};

// Récupérer un entretien RH par ID
const getRhEntretienById = async (id) => {
  return await RhEntretien.findByPk(id);
};

// Mettre à jour un entretien RH
const updateRhEntretien = async (id, data) => {
  return await RhEntretien.update(data, { where: { id_rh_entretien: id } });
};

// Supprimer un entretien RH
const deleteRhEntretien = async (id) => {
  return await RhEntretien.destroy({ where: { id_rh_entretien: id } });
};

module.exports = {
  createRhEntretien,
  getAllRhEntretiens,
  getRhEntretienById,
  updateRhEntretien,
  deleteRhEntretien
};
