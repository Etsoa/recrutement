const Annonce = require('../../models/annoncesModel');
const Poste = require('../../models/postesModel');
const Ville = require('../../models/villesModel');
const Genre = require('../../models/genresModel');
const LangueAnnonce = require('../../models/langueAnnoncesModel');
const QualiteAnnonce = require('../../models/qualiteAnnoncesModel');
const ExperienceAnnonce = require('../../models/experienceAnnoncesModel');
const NiveauFiliereAnnonce = require('../../models/niveauFiliereAnnoncesModel');
const StatusAnnonce = require('../../models/statusAnnoncesModel');
const TypeStatusAnnonce = require('../../models/typeStatusAnnoncesModel');
const Unite = require('../../models/unitesModel');
const Langue = require('../../models/languesModel');
const Qualite = require('../../models/qualitesModel');
const Domaine = require('../../models/domainesModel');
const Filiere = require('../../models/filieresModel');
const Niveau = require('../../models/niveauxModel');

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

const getAnnonceById = async (id) => {
  const annonce = await Annonce.findOne({
    where: { id_annonce: id },
    include: [
      { model: Poste, attributes: ['valeur'] },
      { model: Ville, attributes: ['valeur'] },
      { model: Genre, attributes: ['valeur'] },
      {
        model: LangueAnnonce,
        include: [{ model: Langue, attributes: ['valeur'] }]
      },
      {
        model: QualiteAnnonce,
        include: [{ model: Qualite, attributes: ['valeur'] }]
      },
      {
        model: ExperienceAnnonce,
        include: [{ model: Domaine, attributes: ['valeur'] }]
      },
      {
        model: NiveauFiliereAnnonce,
        include: [
          { model: Niveau, attributes: ['valeur'] },
          { model: Filiere, attributes: ['valeur'] }
        ]
      },
      {
        model: StatusAnnonce,
        include: [
          { model: TypeStatusAnnonce, attributes: ['valeur'] },
          { model: Unite, attributes: ['nom'] }
        ]
      }
    ]
  });

  return annonce;
};



module.exports = { getAnnonceById };
