const { models } = require('../models/index');

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
      models.Genre.findAll(),
      models.SituationMatrimoniale.findAll(),
      models.Ville.findAll(),
      models.Filiere.findAll(),
      models.Niveau.findAll(),
      models.Langue.findAll(),
      models.Qualite.findAll(),
      models.Domaine.findAll(),
      models.Poste.findAll(),
      models.Unite.findAll()
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
      models.DelaiEntretien.findAll(),
      models.DelaiQcm.findAll(),
      models.PourcentageMinimumCv.findAll(),
      models.ScoreMinimumEntretien.findAll(),
      models.ScoreMinimumQcm.findAll()
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
    const pourcentage = await models.PourcentageMinimumCv.findOne();
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