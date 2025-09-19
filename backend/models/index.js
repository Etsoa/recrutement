// Fichier pour initialiser toutes les associations des modèles
// Ceci évite les problèmes de dépendances circulaires

const db = require('../config/db');

// Import de tous les modèles
const Annonce = require('./annoncesModel');
const Candidat = require('./candidatsModel');
const CeoSuggestion = require('./ceoSuggestionsModel');
const ContratEssai = require('./contratEssaisModel');
const CorpsMail = require('./corpsMailsModel');
const DelaiEntretien = require('./delaiEntretienModel');
const DelaiQcm = require('./delaiQcmModel');
const Domaine = require('./domainesModel');
const Employe = require('./employesModel');
const EnvoiQcmCandidat = require('./envoiQcmCandidatsModel');
const ExperienceAnnonce = require('./experienceAnnoncesModel');
const ExperienceTiers = require('./experienceTiersModel');
const Filiere = require('./filieresModel');
const Genre = require('./genresModel');
const HistoriquePosteEmploye = require('./historiquePosteEmployesModel');
const LangueAnnonce = require('./langueAnnoncesModel');
const Langue = require('./languesModel');
const LangueTiers = require('./langueTiersModel');
const Mail = require('./mailsModel');
const NiveauFiliereAnnonce = require('./niveauFiliereAnnoncesModel');
const NiveauFiliereTiers = require('./niveauFiliereTiersModel');
const Niveau = require('./niveauxModel');
const Poste = require('./postesModel');
const PourcentageMinimumCv = require('./pourcentageMinimumCvModel');
const QcmAnnonce = require('./qcmAnnoncesModel');
const QualiteAnnonce = require('./qualiteAnnoncesModel');
const Qualite = require('./qualitesModel');
const QualiteTiers = require('./qualiteTiersModel');
const QuestionQcm = require('./questionQcmsModel');
const ReponseQcmCandidat = require('./reponseQcmCandidatsModel');
const ReponseQcm = require('./reponseQcmsModel');
const RhEntretien = require('./rhEntretiensModel');
const RhSuggestion = require('./rhSuggestionsModel');
const ScoreMinimumEntretien = require('./scoreMinimumEntretienModel');
const ScoreMinimumQcm = require('./scoreMinimumQcmModel');
const ScoreRhEntretien = require('./scoreRhEntretiensModel');
const ScoreUniteEntretien = require('./scoreUniteEntretiensModel');
const SituationMatrimoniale = require('./situationMatrimonialesModel');
const StatusAnnonce = require('./statusAnnoncesModel');
const StatusCeoSuggestion = require('./statusCeoSuggestionsModel');
const StatusEmploye = require('./statusEmployesModel');
const StatusRhEntretien = require('./statusRhEntretiensModel');
const StatusRhSuggestion = require('./statusRhSuggestionsModel');
const StatusUniteEntretien = require('./statusUniteEntretiensModel');
const Tiers = require('./tiersModel');
const TypeStatusAnnonce = require('./typeStatusAnnoncesModel');
const TypeStatusEmploye = require('./typeStatusEmployesModel');
const TypeStatusEntretien = require('./typeStatusEntretiensModel');
const TypeStatusSuggestion = require('./typeStatusSuggestionsModel');
const UniteEntretien = require('./uniteEntretiensModel');
const Unite = require('./unitesModel');
const Ville = require('./villesModel');

// Object contenant tous les modèles
const models = {
  Annonce,
  Candidat,
  CeoSuggestion,
  ContratEssai,
  CorpsMail,
  DelaiEntretien,
  DelaiQcm,
  Domaine,
  Employe,
  EnvoiQcmCandidat,
  ExperienceAnnonce,
  ExperienceTiers,
  Filiere,
  Genre,
  HistoriquePosteEmploye,
  LangueAnnonce,
  Langue,
  LangueTiers,
  Mail,
  NiveauFiliereAnnonce,
  NiveauFiliereTiers,
  Niveau,
  Poste,
  PourcentageMinimumCv,
  QcmAnnonce,
  QualiteAnnonce,
  Qualite,
  QualiteTiers,
  QuestionQcm,
  ReponseQcmCandidat,
  ReponseQcm,
  RhEntretien,
  RhSuggestion,
  ScoreMinimumEntretien,
  ScoreMinimumQcm,
  ScoreRhEntretien,
  ScoreUniteEntretien,
  SituationMatrimoniale,
  StatusAnnonce,
  StatusCeoSuggestion,
  StatusEmploye,
  StatusRhEntretien,
  StatusRhSuggestion,
  StatusUniteEntretien,
  Tiers,
  TypeStatusAnnonce,
  TypeStatusEmploye,
  TypeStatusEntretien,
  TypeStatusSuggestion,
  UniteEntretien,
  Unite,
  Ville
};

// Initialiser les associations pour chaque modèle qui a une méthode associate
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { db, models };