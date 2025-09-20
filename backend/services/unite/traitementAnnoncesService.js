const Annonce = require('../../models/annoncesModel');
const Poste = require('../../models/postesModel');
const Ville = require('../../models/villesModel');
const Genre = require('../../models/genresModel');

const LangueAnnonce = require('../../models/langueAnnoncesModel');
const Langue = require('../../models/languesModel');

const QualiteAnnonce = require('../../models/qualiteAnnoncesModel');
const Qualite = require('../../models/qualitesModel');

const ExperienceAnnonce = require('../../models/experienceAnnoncesModel');
const Domaine = require('../../models/domainesModel');

const NiveauFiliereAnnonce = require('../../models/niveauFiliereAnnoncesModel');
const Niveau = require('../../models/niveauxModel');
const Filiere = require('../../models/filieresModel');

const StatusAnnonce = require('../../models/statusAnnoncesModel');
const TypeStatusAnnonce = require('../../models/typeStatusAnnoncesModel');
const Unite = require('../../models/unitesModel');


// ByIdUnite
exports.getAllAnnonces = async () => {
  try {
    const annonces = await Annonce.findAll({
      include: [
        { model: Poste, attributes: ['valeur'] }, // ou 'nom_poste' selon ton schéma
        { model: Ville, attributes: ['valeur'] }, // ou 'nom_ville'
        { model: Genre, attributes: ['valeur'] }  // ou 'nom_genre'
      ],
      order: [['id_annonce', 'ASC']]
    });
    return annonces;
  } catch (err) {
    throw new Error('Erreur lors de la récupération des annonces : ' + err.message);
  }
};

exports.getAnnonceById = async (id) => {
  try {
    const annonce = await Annonce.findOne({
      where: { id_annonce: id },
      include: [
        { model: Poste, attributes: ['valeur'] },
        { model: Ville, attributes: ['valeur'] },
        { model: Genre, attributes: ['valeur'] }
      ]
    });
    if (!annonce) return null;

    const langues = await LangueAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Langue, attributes: ['valeur'] }]
    });

    const qualites = await QualiteAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Qualite, attributes: ['valeur'] }]
    });

    const experiences = await ExperienceAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Domaine, attributes: ['valeur'] }]
    });

    const niveauxFiliere = await NiveauFiliereAnnonce.findAll({
      where: { id_annonce: id },
      include: [
        { model: Niveau, attributes: ['valeur'] },
        { model: Filiere, attributes: ['valeur'] }
      ]
    });

    const statuts = await StatusAnnonce.findAll({
      where: { id_annonce: id },
      include: [
        { model: TypeStatusAnnonce, attributes: ['valeur'] }
      ]
    });

    return {
      annonce,
      langues,
      qualites,
      experiences,
      niveauxFiliere,
      statuts
    };
  } catch (err) {
    throw new Error('Erreur lors de la récupération des détails : ' + err.message);
  }
};
