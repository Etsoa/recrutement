const Genre = require('../models/genresModel');
const SituationMatrimoniale = require('../models/situationMatrimonialesModel');
const Ville = require('../models/villesModel');
const Filiere = require('../models/filieresModel');
const Niveau = require('../models/niveauxModel');
const Langue = require('../models/languesModel');
const Qualite = require('../models/qualitesModel');
const Domaine = require('../models/domainesModel');
const Poste = require('../models/postesModel');
const Unite = require('../models/unitesModel');
const DelaiEntretien = require('../models/delaiEntretienModel');
const DelaiQcm = require('../models/delaiQcmModel');
const PourcentageMinimumCv = require('../models/pourcentageMinimumCvModel');
const ScoreMinimumEntretien = require('../models/scoreMinimumEntretienModel');
const ScoreMinimumQcm = require('../models/scoreMinimumQcmModel');

async function getAllParametresReference() {
  try {
    const [
      genres,
      situationMatrimoniales,
      villes,
      filieres,
      niveaux,
      langues,
      qualites,
      domaines,
      postes,
      unites
    ] = await Promise.all([
  Genre.findAll(),
  SituationMatrimoniale.findAll(),
  Ville.findAll(),
  Filiere.findAll(),
  Niveau.findAll(),
  Langue.findAll(),
  Qualite.findAll(),
  Domaine.findAll(),
  Poste.findAll(),
  Unite.findAll()
    ]);

    return {
      genres,
      situationMatrimoniales,
      villes,
      filieres,
      niveaux,
      langues,
      qualites,
      domaines,
      postes,
      unites
    };
  } catch (error) {
    console.error('Erreur getAllParametresReference:', error);
    throw error;
  }
}

async function getAllParametres() {
  try {
    const [
      delaiEntretien,
      delaiQcm,
      pourcentageMinimumCv,
      scoreMinimumEntretien,
      scoreMinimumQcm
    ] = await Promise.all([
  DelaiEntretien.findAll(),
  DelaiQcm.findAll(),
  PourcentageMinimumCv.findAll(),
  ScoreMinimumEntretien.findAll(),
  ScoreMinimumQcm.findAll()
    ]);

    return {
      delaiEntretien,
      delaiQcm,
      pourcentageMinimumCv,
      scoreMinimumEntretien,
      scoreMinimumQcm
    };
  } catch (error) {
    console.error('Erreur getAllParametres:', error);
    throw error;
  }
}

async function getPourcentageMinimumCv() {
  try {
  const pourcentage = await PourcentageMinimumCv.findOne();
  } catch (error) {
    console.error('Erreur getPourcentageMinimumCv:', error);
    throw error;
  }
}

module.exports = {
  getAllParametresReference,
  getAllParametres,
  getPourcentageMinimumCv
};