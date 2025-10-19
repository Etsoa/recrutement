const Annonce = require('./annoncesModel');
const StatusAnnonce = require('./statusAnnoncesModel');
const TypeStatusAnnonce = require('./typeStatusAnnoncesModel');
const Poste = require('./postesModel');
const Ville = require('./villesModel');
const Genre = require('./genresModel');
const NiveauFiliereAnnonce = require('./niveauFiliereAnnoncesModel');
const Filiere = require('./filieresModel');
const Niveau = require('./niveauxModel');
const LangueAnnonce = require('./langueAnnoncesModel');
const Langue = require('./languesModel');
const QualiteAnnonce = require('./qualiteAnnoncesModel');
const Qualite = require('./qualitesModel');
const ExperienceAnnonce = require('./experienceAnnoncesModel');
const Domaine = require('./domainesModel');
const QcmAnnonce = require('./qcmAnnoncesModel');

// Associations Annonce
Annonce.belongsTo(Poste, { foreignKey: 'id_poste' });
Annonce.belongsTo(Ville, { foreignKey: 'id_ville' });
Annonce.belongsTo(Genre, { foreignKey: 'id_genre' });

// Associations StatusAnnonce
StatusAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
StatusAnnonce.belongsTo(TypeStatusAnnonce, { foreignKey: 'id_type_status_annonce' });
Annonce.hasMany(StatusAnnonce, { foreignKey: 'id_annonce', as: 'StatusAnnonces' });
TypeStatusAnnonce.hasMany(StatusAnnonce, { foreignKey: 'id_type_status_annonce' });

// Associations NiveauFiliereAnnonce
NiveauFiliereAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
NiveauFiliereAnnonce.belongsTo(Filiere, { foreignKey: 'id_filiere' });
NiveauFiliereAnnonce.belongsTo(Niveau, { foreignKey: 'id_niveau' });
Annonce.hasMany(NiveauFiliereAnnonce, { foreignKey: 'id_annonce' });

// Associations LangueAnnonce
LangueAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
LangueAnnonce.belongsTo(Langue, { foreignKey: 'id_langue' });
Annonce.hasMany(LangueAnnonce, { foreignKey: 'id_annonce' });

// Associations QualiteAnnonce
QualiteAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
QualiteAnnonce.belongsTo(Qualite, { foreignKey: 'id_qualite' });
Annonce.hasMany(QualiteAnnonce, { foreignKey: 'id_annonce' });

// Associations ExperienceAnnonce
ExperienceAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
ExperienceAnnonce.belongsTo(Domaine, { foreignKey: 'id_domaine' });
Annonce.hasMany(ExperienceAnnonce, { foreignKey: 'id_annonce' });

// Associations QcmAnnonce
QcmAnnonce.belongsTo(Annonce, { foreignKey: 'id_annonce' });
Annonce.hasMany(QcmAnnonce, { foreignKey: 'id_annonce' });