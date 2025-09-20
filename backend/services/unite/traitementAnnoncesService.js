const Annonce = require('../../models/annoncesModel');
const Poste = require('../../models/postesModel');
const Ville = require('../../models/villesModel');
const Genre = require('../../models/genresModel');
const Unite = require('../../models/unitesModel');
const Langue = require('../../models/languesModel');
const Qualite = require('../../models/qualitesModel');
const Domaine = require('../../models/domainesModel');
const Filiere = require('../../models/filieresModel');
const Niveau = require('../../models/niveauxModel');
const LangueAnnonce = require('../../models/langueAnnoncesModel');
const QualiteAnnonce = require('../../models/qualiteAnnoncesModel');
const ExperienceAnnonce = require('../../models/experienceAnnoncesModel');
const NiveauFiliereAnnonce = require('../../models/niveauFiliereAnnoncesModel');
const StatusAnnonce = require('../../models/statusAnnoncesModel');
const TypeStatusAnnonce = require('../../models/typeStatusAnnoncesModel');


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
  return await Annonce.findOne({
    where: { id_annonce: id },
    include: [
      { model: Poste, attributes: ['valeur'] },
      { model: Ville, attributes: ['valeur'] },
      { model: Genre, attributes: ['valeur'] },
      {
        association: 'langues',            // alias défini dans belongsToMany
        attributes: ['valeur'],
        through: { attributes: [] }       // masque la table pivot
      },
      {
        association: 'qualites',
        attributes: ['valeur'],
        through: { attributes: [] }
      },
      {
        association: 'experiences',
        attributes: ['valeur'],
        through: { attributes: [] }
      },
      {
        association: 'niveaux',
        attributes: ['valeur'],
        through: { attributes: [] }
      },
      {
        association: 'filieres',
        attributes: ['valeur'],
        through: { attributes: [] }
      },
      {
        model: StatusAnnonce,
        as: 'status',
        include: [
          { model: TypeStatusAnnonce, attributes: ['valeur'] },
          { model: Unite, attributes: ['nom'] }
        ]
      }
    ],
    order: [['id_annonce', 'ASC']]
  });
};
