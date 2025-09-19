const Candidat = require('../models/candidatsModel');

async function checkCandidatExists(id_tiers, id_annonce) {
  try {
  const candidat = await Candidat.findOne({
      where: { 
        id_tiers,
        id_annonce 
      }
    });
    
    return !!candidat; // Retourne true si le candidat existe, false sinon
  } catch (error) {
    console.error('Erreur checkCandidatExists:', error);
    throw error;
  }
}

async function createCandidat(candidatData) {
  try {
  const candidat = await Candidat.create(candidatData);
    return candidat;
  } catch (error) {
    console.error('Erreur createCandidat:', error);
    throw error;
  }
}

module.exports = {
  checkCandidatExists,
  createCandidat
};