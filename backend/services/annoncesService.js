const Annonce = require('../models/annoncesModel');
const StatusAnnonce = require('../models/statusAnnoncesModel');
const TypeStatusAnnonce = require('../models/typeStatusAnnoncesModel');
const Poste = require('../models/postesModel');
const Ville = require('../models/villesModel');
const Genre = require('../models/genresModel');
const NiveauFiliereAnnonce = require('../models/niveauFiliereAnnoncesModel');
const Filiere = require('../models/filieresModel');
const Niveau = require('../models/niveauxModel');
const LangueAnnonce = require('../models/langueAnnoncesModel');
const Langue = require('../models/languesModel');
const QualiteAnnonce = require('../models/qualiteAnnoncesModel');
const Qualite = require('../models/qualitesModel');
const ExperienceAnnonce = require('../models/experienceAnnoncesModel');
const Domaine = require('../models/domainesModel');
const QcmAnnonce = require('../models/qcmAnnoncesModel');
const QuestionQcm = require('../models/questionQcmsModel');

async function getAllAnnonces() {
	try {
		const annonces = await Annonce.findAll();
		return annonces;
	} catch (error) {
		console.error('Erreur getAllAnnonces:', error);
		throw error;
	}
}

async function getAllAnnoncesActives() {
	try {
		const typeStatusActive = await TypeStatusAnnonce.findOne({ where: { valeur: 'Publie' } });
		if (!typeStatusActive) return [];
		const annonces = await Annonce.findAll({
			include: [
				{
					model: StatusAnnonce,
					required: true,
					where: { id_type_status_annonce: typeStatusActive.id_type_status_annonce },
				},
				{ model: Poste },
				{ model: Ville },
				{ model: Genre }
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
		return await Annonce.findOne({
			where: { id_annonce },
			include: [
				{ model: Poste },
				{ model: Ville },
				{ model: Genre },
				{
					model: NiveauFiliereAnnonce,
					include: [
						{ model: Filiere },
						{ model: Niveau }
					]
				},
				{
					model: LangueAnnonce,
					include: [ { model: Langue } ]
				},
				{
					model: QualiteAnnonce,
					include: [ { model: Qualite } ]
				},
				{
					model: ExperienceAnnonce,
					include: [ { model: Domaine } ]
				},
				{
					model: QcmAnnonce,
					include: [ { model: QuestionQcm } ]
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
	const typeStatusActive = await TypeStatusAnnonce.findOne({ where: { valeur: 'Publie' } });
    if (!typeStatusActive) return false;

	const annonce = await Annonce.findOne({
		where: { id_annonce },
		include: [
			{
				model: StatusAnnonce,
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