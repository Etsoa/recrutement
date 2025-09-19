const { models } = require('../models/index');

async function checkCinExists(cin) {
  try {
    const tiers = await models.Tiers.findOne({
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
    const nouveauTiers = await models.Tiers.create(tiersData);
    const id_tiers = nouveauTiers.id_tiers;

    // Créer les relations si elles existent
    if (relations.formations && relations.formations.length > 0) {
      for (const formation of relations.formations) {
        await models.NiveauFiliereTiers.create({
          id_tiers,
          id_filiere: formation.id_filiere,
          id_niveau: formation.id_niveau
        });
      }
    }

    if (relations.langues && relations.langues.length > 0) {
      for (const langue of relations.langues) {
        await models.LangueTiers.create({
          id_tiers,
          id_langue: langue.id_langue
        });
      }
    }

    if (relations.qualites && relations.qualites.length > 0) {
      for (const qualite of relations.qualites) {
        await models.QualiteTiers.create({
          id_tiers,
          id_qualite: qualite.id_qualite
        });
      }
    }

    if (relations.experiences && relations.experiences.length > 0) {
      for (const experience of relations.experiences) {
        await models.ExperienceTiers.create({
          id_tiers,
          id_domaine: experience.id_domaine,
          duree: experience.duree
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
};z