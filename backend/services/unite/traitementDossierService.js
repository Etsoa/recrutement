const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

const Candidat = require('../../models/candidatsModel');
const Tiers = require('../../models/tiersModel');

const LangueTiers = require('../../models/langueTiersModel');
const QualiteTiers = require('../../models/qualiteTiersModel');
const ExperienceTiers = require('../../models/experienceTiersModel');
const NiveauFiliereTiers = require('../../models/niveauFiliereTiersModel');

const QuestionQcm = require('../../models/questionQcmsModel');
const ReponseQcm = require('../../models/reponseQcmsModel');
const QcmAnnonce = require('../../models/qcmAnnoncesModel');

const Employe = require('../../models/employesModel');
const TypeStatusEmploye = require('../../models/typeStatusEmployesModel');
const StatusEmploye = require('../../models/statusEmployesModel');

const EnvoiQcmCandidat = require('../../models/envoiQcmCandidatsModel');
const ReponseQcmCandidat = require('../../models/reponseQcmCandidatsModel');

const UniteEntretien = require('../../models/uniteEntretiensModel');
const StatusUniteEntretien = require('../../models/statusUniteEntretiensModel');
const TypeStatusEntretien = require('../../models/typeStatusEntretiensModel');
const ScoreUniteEntretien = require('../../models/scoreUniteEntretiensModel');

const Mail = require('../../models/mailsModel');
const CorpsMail = require('../../models/corpsMailsModel');
const AdresseMail = require('../../models/adresseMailModel');

exports.sendQcmCandidat = async (id_candidat) => {
  if (!id_candidat) throw new Error('id_candidat requis');

  // Récupérer le candidat et son id_tiers
  const candidat = await Candidat.findByPk(id_candidat);
  if (!candidat) throw new Error(`Candidat introuvable pour id_candidat=${id_candidat}`);

  const tiers = await Tiers.findByPk(candidat.id_tiers);
  if (!tiers) throw new Error(`Tiers introuvable pour id_tiers=${candidat.id_tiers}`);

  // Générer token et lien
  const token = crypto.randomBytes(32).toString('hex');
  const link = 'http://localhost:5000/verification';
  const date_envoi = new Date();

  // Récupérer objet et parties du mail
  const mail = await Mail.findByPk(1);
  const corpsRows = await CorpsMail.findAll({
    where: { id_mail: 1 },
    order: [['id_corps_mail', 'ASC']]
  });

  const parts = corpsRows.map(r => r.corps.toString());

  // Injecter le lien et le token
  if (parts.length >= 2) {
    parts[1] = parts[1].trim() + '\n\n' + link;
  } else {
    if (parts.length === 0) parts.push('');
    parts.splice(1, 0, link);
  }

  const tokenLine = `Token pour cette session : ${token}`;
  if (parts.length >= 1) {
    parts.splice(parts.length - 1, 0, tokenLine);
  } else {
    parts.push(tokenLine);
  }

  const corps = parts.join('\n\n').trim();
  const objet = mail ? mail.objet : 'Objet indisponible';

  // Adresse d'envoi depuis la base
  const sender = await AdresseMail.findOne();
  if (!sender) throw new Error('Aucune adresse d envoi trouvée dans adresseMail');

  // Configurer Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: sender.valeur,
      pass: sender.mot_de_passe
    }
  });

  // Envoyer l'email au candidat via Tiers.email
  await transporter.sendMail({
    from: sender.valeur,
    to: tiers.email,  // Email récupéré depuis Tiers
    subject: objet,
    text: corps
  });

  // Enregistrer l'envoi dans EnvoiQcmCandidat
  await EnvoiQcmCandidat.create({
    id_candidat,
    lien: link,
    token,
    date_envoi
  });
};
