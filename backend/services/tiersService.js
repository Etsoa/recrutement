const Tiers = require('../models/tiersModel');
const NiveauFiliereTiers = require('../models/niveauFiliereTiersModel');
const LangueTiers = require('../models/langueTiersModel');
const QualiteTiers = require('../models/qualiteTiersModel');
const ExperienceTiers = require('../models/experienceTiersModel');

async function checkCinExists(cin) {
  try {
  const tiers = await Tiers.findOne({
      where: { cin }
    });
    
    return tiers;
  } catch (error) {
    console.error('Erreur checkCinExists:', error);
    throw error;
  }
}

async function createTiersComplete(tiersData, relations) {
  try {
    // Créer le tiers principal
  const nouveauTiers = await Tiers.create(tiersData);
    const id_tiers = nouveauTiers.id_tiers;

    // Créer les relations si elles existent
    if (relations.formations && relations.formations.length > 0) {
      for (const formation of relations.formations) {
  await NiveauFiliereTiers.create({
          id_tiers,
          id_filiere: formation.id_filiere,
          id_niveau: formation.id_niveau
        });
      }
    }

    if (relations.langues && relations.langues.length > 0) {
      for (const langue of relations.langues) {
  await LangueTiers.create({
          id_tiers,
          id_langue: langue.id_langue
        });
      }
    }

    if (relations.qualites && relations.qualites.length > 0) {
      for (const qualite of relations.qualites) {
  await QualiteTiers.create({
          id_tiers,
          id_qualite: qualite.id_qualite
        });
      }
    }

    if (relations.experiences && relations.experiences.length > 0) {
      for (const experience of relations.experiences) {
        await ExperienceTiers.create({
          id_tiers,
          id_domaine: experience.id_domaine,
          date_debut: experience.date_debut,
          date_fin: experience.date_fin,
          duree: experience.duree || 0 // duree optionnelle, calculée si nécessaire
        });
      }
    }

    return nouveauTiers;
  } catch (error) {
    console.error('Erreur createTiersComplete:', error);
    throw error;
  }
}

module.exports = {
  checkCinExists,
  createTiersComplete
};