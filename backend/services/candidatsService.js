const Candidat = require('../models/candidatsModel');

async function checkCandidatExists(id_tiers, id_annonce) {
  try {
    const candidat = await Candidat.findOne({
      where: { 
        id_tiers,
        id_annonce 
      },
      include: [
        { model: Tiers },
        { model: Annonce }
      ]
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
    // Récupérer le candidat créé avec toutes ses associations
    const candidatComplet = await Candidat.findOne({
      where: { id_candidat: candidat.id_candidat },
      include: [
        { model: Tiers },
        { model: Annonce }
      ]
    });
    return candidatComplet;
  } catch (error) {
    console.error('Erreur createCandidat:', error);
    throw error;
  }
}

module.exports = {
  checkCandidatExists,
  createCandidat
};