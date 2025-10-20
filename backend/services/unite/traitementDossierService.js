const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const Candidat = require('../../models/candidatsModel');
const Tiers = require('../../models/tiersModel');

const EnvoiQcmCandidat = require('../../models/envoiQcmCandidatsModel');
const ReponseQcmCandidat = require('../../models/reponseQcmCandidatsModel');

const UniteEntretien = require('../../models/uniteEntretiensModel');
const StatusUniteEntretien = require('../../models/statusUniteEntretiensModel');

const Mail = require('../../models/mailsModel');
const CorpsMail = require('../../models/corpsMailsModel');
const AdresseMail = require('../../models/adresseMailModel');

const db = require('../../config/db');

exports.sendQcmCandidat = async (id_candidat) => {
  if (!id_candidat) throw new Error('id_candidat requis');

  // Récupérer le candidat et son id_tiers
  const candidat = await Candidat.findByPk(id_candidat);
  if (!candidat) throw new Error(`Candidat introuvable pour id_candidat=${id_candidat}`);

  const tiers = await Tiers.findByPk(candidat.id_tiers);
  if (!tiers) throw new Error(`Tiers introuvable pour id_tiers=${candidat.id_tiers}`);

  // Générer token et lien
  const token = crypto.randomBytes(32).toString('hex');
  const link = 'http://localhost:3000/qcm/' + token;
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

// utilitaires date
const addMinutes = (d, minutes) => new Date(d.getTime() + minutes * 60000);
const addDays = (d, days) => new Date(d.getTime() + days * 24 * 60 * 60000);

// format date simple pour mail
const formatDateTime = (d) => {
  return d.toLocaleString('fr-FR', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
};

// Version simplifiée de la planification d'entretien
exports.sendUniteEntretien = async (id_candidat, id_unite) => {
  if (!id_candidat) throw new Error('id_candidat requis');
  if (!id_unite) throw new Error('id_unite requis');

  const transaction = await db.transaction();
  try {
    // Version simplifiée : planifier automatiquement pour demain à 10h
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0); // 10h00 du matin

    const SLOT_MINUTES = 60; // 1 heure par défaut

    // 1) insertion unite_entretiens directe (sans contraintes complexes)
    const newUniteEntretien = await UniteEntretien.create({
      id_candidat,
      id_unite,
      date_entretien: tomorrow,
      duree: SLOT_MINUTES
    }, { transaction });

    // 2) insertion status_unite_entretien (id_type_status_entretien = 1)
    await StatusUniteEntretien.create({
      id_unite_entretien: newUniteEntretien.id_unite_entretien || newUniteEntretien.id,
      id_type_status_entretien: 1,
      date_changement: new Date()
    }, { transaction });

    // 3) récupérer candidat et tiers pour l'email
    const candidatRow = await Candidat.findOne({ where: { id_candidat }, transaction });
    if (!candidatRow) throw new Error('Candidat introuvable');

    const tiers = await Tiers.findOne({ where: { id_tiers: candidatRow.id_tiers }, transaction });

    // si email absent, commit et retourner
    if (!tiers || !tiers.email) {
      await transaction.commit();
      return {
        scheduled: {
          id_unite_entretien: newUniteEntretien.id_unite_entretien || newUniteEntretien.id,
          date_entretien: tomorrow,
          duree: SLOT_MINUTES
        },
        mailSent: false,
        message: 'Entretien créé mais e-mail du candidat introuvable'
      };
    }

    const candidateEmail = tiers.email;

    // 4) construction du mail simple
    const subject = 'Convocation à un entretien';
    const formattedDate = formatDateTime(tomorrow);
    
    // récupérer le score QCM s'il existe
    let scoreObtained = null;
    const envois = await EnvoiQcmCandidat.findAll({
      where: { id_candidat },
      attributes: ['id_envoi_qcm_candidat', 'date_envoi'],
      order: [['date_envoi', 'DESC']],
      transaction
    });

    if (envois && envois.length > 0) {
      const envoiIds = envois.map(e => e.id_envoi_qcm_candidat);
      const lastResponseWithScore = await ReponseQcmCandidat.findOne({
        where: { id_envoi_qcm_candidat: { [Op.in]: envoiIds } },
        order: [['fin', 'DESC']],
        transaction
      });
      if (lastResponseWithScore && typeof lastResponseWithScore.score !== 'undefined') {
        scoreObtained = lastResponseWithScore.score;
      }
    }

    // récupérer nom de l'unite
    let uniteName = null;
    try {
      const uniteRow = await db.query(
        'SELECT nom FROM unites WHERE id_unite = $1',
        { bind: [id_unite], type: db.QueryTypes.SELECT, transaction }
      );
      if (Array.isArray(uniteRow) && uniteRow.length > 0) uniteName = uniteRow[0].nom;
    } catch (e) { /* ignore si échec */ }

    const mailBody = `
Bonjour ${tiers.prenom} ${tiers.nom},

Nous avons le plaisir de vous convoquer à un entretien d'embauche.

Détails de l'entretien :
- Date : ${formattedDate}
- Durée : ${SLOT_MINUTES} minutes
- Unité : ${uniteName || `Unité ${id_unite}`}
${scoreObtained !== null ? `- Votre score QCM : ${scoreObtained}` : ''}

Veuillez vous présenter à l'heure indiquée.

Cordialement,
L'équipe de recrutement
    `.trim();

    // 5) récupérer l'adresse d'envoi
    let senderEmail = process.env.SMTP_USER || null;
    let senderPass = process.env.SMTP_PASS || null;

    if (!senderEmail) {
      try {
        const senderRow = await AdresseMail.findOne({ transaction });
        if (senderRow) {
          senderEmail = senderRow.valeur;
          senderPass = senderRow.mot_de_passe;
        }
      } catch (e) { /* ignore */ }
    }

    if (!senderEmail) {
      await transaction.commit();
      return {
        scheduled: {
          id_unite_entretien: newUniteEntretien.id_unite_entretien || newUniteEntretien.id,
          date_entretien: tomorrow,
          duree: SLOT_MINUTES
        },
        mailSent: false,
        message: 'Entretien créé mais adresse d\'envoi non configurée'
      };
    }

    // 6) config et envoi email
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const smtpSecure = smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: senderEmail,
        pass: senderPass
      }
    });

    let mailSent = false;
    try {
      await transporter.sendMail({
        from: senderEmail,
        to: candidateEmail,
        subject,
        text: mailBody
      });
      mailSent = true;
    } catch (mailErr) {
      console.error('Erreur envoi mail entretien:', mailErr && mailErr.message ? mailErr.message : mailErr);
      mailSent = false;
    }

    // 7) commit transaction
    await transaction.commit();

    return {
      scheduled: {
        id_unite_entretien: newUniteEntretien.id_unite_entretien || newUniteEntretien.id,
        date_entretien: tomorrow,
        duree: SLOT_MINUTES
      },
      mailSent,
      candidateEmail,
      message: mailSent ? 'Entretien planifié et e-mail envoyé' : 'Entretien planifié, échec envoi e-mail'
    };

  } catch (err) {
    await transaction.rollback();
    throw new Error('Erreur sendUniteEntretien : ' + (err.message || err));
  }
};