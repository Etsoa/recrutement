const { models } = require('../models/index');

async function getAllAnnonces() {
	try {
		const annonces = await models.Annonce.findAll();
		return annonces;
	} catch (error) {
		console.error('Erreur getAllAnnonces:', error);
		throw error;
	}
}

async function getAllAnnoncesActives() {
	try {
		const typeStatusActive = await models.TypeStatusAnnonce.findOne({ where: { valeur: 'Publie' } });
		if (!typeStatusActive) return [];
		const annonces = await models.Annonce.findAll({
			include: [
				{
					model: models.StatusAnnonce,
					required: true,
					where: { id_type_status_annonce: typeStatusActive.id_type_status_annonce },
				},
				{ model: models.Poste },
				{ model: models.Ville },
				{ model: models.Genre }
			]
		});
		return annonces;
	} catch (error) {
		console.error('Erreur getAllAnnoncesActives:', error);
		throw error;
	}
}

async function getAnnonceById(id_annonce) {
	try {
		return await models.Annonce.findOne({
			where: { id_annonce },
			include: [
				{ model: models.Poste },
				{ model: models.Ville },
				{ model: models.Genre },
				{
					model: models.NiveauFiliereAnnonce,
					include: [
						{ model: models.Filiere },
						{ model: models.Niveau }
					]
				},
				{
					model: models.LangueAnnonce,
					include: [ { model: models.Langue } ]
				},
				{
					model: models.QualiteAnnonce,
					include: [ { model: models.Qualite } ]
				},
				{
					model: models.ExperienceAnnonce,
					include: [ { model: models.Domaine } ]
				},
				{
					model: models.QcmAnnonce,
					include: [ { model: models.QuestionQcm } ]
				}
			]
		});
	} catch (error) {
		console.error('Erreur getAnnonceById:', error);
		throw error;
  }
}

async function checkAnnonceActive(id_annonce) {
  try {
    const typeStatusActive = await models.TypeStatusAnnonce.findOne({ where: { valeur: 'Publie' } });
    if (!typeStatusActive) return false;

    const annonce = await models.Annonce.findOne({
      where: { id_annonce },
      include: [
        {
          model: models.StatusAnnonce,
          required: true,
          where: { id_type_status_annonce: typeStatusActive.id_type_status_annonce },
        }
      ]
    });

    return !!annonce; // Retourne true si l'annonce existe et est active, false sinon
  } catch (error) {
    console.error('Erreur checkAnnonceActive:', error);
    throw error;
  }
}

module.exports = {
	getAllAnnonces,
	getAllAnnoncesActives,
	getAnnonceById,
	checkAnnonceActive
};