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
    return pourcentage ? pourcentage.valeur : 70; // Valeur par défaut
  } catch (error) {
    console.error('Erreur getPourcentageMinimumCv:', error);
    throw error;
  }
}

// Méthodes de résolution par valeur
async function getGenreByValue(valeur) {
  try {
    return await Genre.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getGenreByValue:', error);
    return null;
  }
}

async function getSituationMatrimonialeByValue(valeur) {
  try {
    return await SituationMatrimoniale.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getSituationMatrimonialeByValue:', error);
    return null;
  }
}

async function getVilleByValue(valeur) {
  try {
    return await Ville.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getVilleByValue:', error);
    return null;
  }
}

async function getFiliereByValue(valeur) {
  try {
    return await Filiere.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getFiliereByValue:', error);
    return null;
  }
}

async function getNiveauByValue(valeur) {
  try {
    return await Niveau.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getNiveauByValue:', error);
    return null;
  }
}

async function getPosteByValue(valeur) {
  try {
    return await Poste.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getPosteByValue:', error);
    return null;
  }
}

async function getLangueByValue(valeur) {
  try {
    return await Langue.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getLangueByValue:', error);
    return null;
  }
}

async function getQualiteByValue(valeur) {
  try {
    return await Qualite.findOne({ where: { valeur } });
  } catch (error) {
    console.error('Erreur getQualiteByValue:', error);
    return null;
  }
}

async function getAllDomaines() {
  try {
    return await Domaine.findAll({
      order: [['id_domaine', 'ASC']]
    });
  } catch (error) {
    console.error('Erreur getAllDomaines:', error);
    return [];
  }
}

// Récupérer les domaines d'expérience requis pour une annonce
async function getDomainesForAnnonce(id_annonce) {
  try {
    const ExperienceAnnonce = require('../models/experienceAnnoncesModel');
    const experiencesAnnonce = await ExperienceAnnonce.findAll({
      where: { id_annonce },
      include: [{
        model: Domaine,
        attributes: ['id_domaine', 'valeur']
      }],
      attributes: ['id_domaine']
    });
    
    // Extraire les domaines uniques
    const domaines = experiencesAnnonce.map(exp => exp.Domaine);
    const domainesUniques = domaines.filter((domaine, index, arr) => 
      arr.findIndex(d => d.id_domaine === domaine.id_domaine) === index
    );
    
    return domainesUniques;
  } catch (error) {
    console.error('Erreur lors de la récupération des domaines pour l\'annonce:', error);
    throw error;
  }
}

module.exports = {
  getAllParametresReference,
  getAllParametres,
  getPourcentageMinimumCv,
  getGenreByValue,
  getSituationMatrimonialeByValue,
  getVilleByValue,
  getFiliereByValue,
  getNiveauByValue,
  getPosteByValue,
  getLangueByValue,
  getQualiteByValue,
  getAllDomaines,
  getDomainesForAnnonce
};