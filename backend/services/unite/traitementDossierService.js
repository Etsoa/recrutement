const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const Candidat = require('../../models/candidatsModel');
const Tiers = require('../../models/tiersModel');

const EnvoiQcmCandidat = require('../../models/envoiQcmCandidatsModel');
const ReponseQcmCandidat = require('../../models/reponseQcmCandidatsModel');

const UniteEntretien = require('../../models/uniteEntretiensModel');
const StatusUniteEntretien = require('../../models/statusUniteEntretiensModel');
const DelaiEntretien = require('../../models/delaiEntretienModel');

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
  const link = 'http://localhost:5000/qcm/' + token;
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
const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x;
};

// format date simple pour mail
const formatDateTime = (d) => {
  return d.toLocaleString('fr-FR', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
};

// Remplace la fonction existante par celle-ci

exports.sendUniteEntretien =  async (id_candidat, id_unite) => {
  if (!id_candidat) throw new Error('id_candidat requis');
  if (!id_unite) throw new Error('id_unite requis');

  const transaction = await db.transaction();
  try {
    // 1) récupérer delai_entretien (valeur en jours)
    const delaiRow = await DelaiEntretien.findOne({ transaction });
    if (!delaiRow) throw new Error('delai_entretien non configuré en base');
    const delaiDays = Number(delaiRow.valeur || delaiRow.valeur === 0 ? delaiRow.valeur : null);
    if (Number.isNaN(delaiDays)) throw new Error('valeur delai_entretien invalide');

    // 2) récupérer la dernière réponse QCM (ou la date d'envoi la plus récente si pas de réponse)
    const envois = await EnvoiQcmCandidat.findAll({
      where: { id_candidat },
      attributes: ['id_envoi_qcm_candidat', 'date_envoi'],
      order: [['date_envoi', 'DESC']],
      transaction
    });

    let referenceDate = null;
    let envoiIds = [];
    if (envois && envois.length > 0) {
      envoiIds = envois.map(e => e.id_envoi_qcm_candidat);

      // chercher la réponse la plus récente liée à ces envois (par date fin)
      const derniereReponse = await ReponseQcmCandidat.findOne({
        where: { id_envoi_qcm_candidat: { [Op.in]: envoiIds } },
        order: [['fin', 'DESC']],
        transaction
      });

      if (derniereReponse && (derniereReponse.fin || derniereReponse.debut)) {
        referenceDate = new Date(derniereReponse.fin || derniereReponse.debut);
      } else {
        referenceDate = new Date(envois[0].date_envoi);
      }
    } else {
      throw new Error('Aucun envoi QCM trouvé pour ce candidat');
    }

    // 3) calculer date minimale autorisée pour entretien
    const minAllowedDate = addDays(referenceDate, delaiDays);

    // 4) définir fenêtre de recherche (on cherche dans delaiDays à partir de minAllowedDate)
    const windowStart = new Date(minAllowedDate);
    const windowEnd = addDays(windowStart, delaiDays);

    // 5) récupérer entretiens existants pour l'unité dans la fenêtre
    const existants = await UniteEntretien.findAll({
      where: {
        id_unite,
        date_entretien: {
          [Op.between]: [startOfDay(windowStart), addDays(startOfDay(windowEnd), 1)]
        }
      },
      transaction
    });

    const existIntervals = existants.map(e => {
      const s = new Date(e.date_entretien);
      const dur = Number(e.duree || 30);
      const en = addMinutes(s, dur);
      return { start: s, end: en };
    });

    // 6) trouver un créneau libre 30min entre WORK_START et WORK_END (08:00 - 16:00)
    const WORK_START_HOUR = 8;
    const WORK_END_HOUR = 16;
    const SLOT_MINUTES = 30;

    let chosenSlot = null;
    for (let day = new Date(startOfDay(windowStart)); day <= windowEnd && !chosenSlot; day = addDays(day, 1)) {
      for (let h = WORK_START_HOUR; h < WORK_END_HOUR && !chosenSlot; h++) {
        for (let m = 0; m < 60 && !chosenSlot; m += SLOT_MINUTES) {
          const slotStart = new Date(day);
          slotStart.setHours(h, m, 0, 0);
          if (slotStart < minAllowedDate) continue;

          const slotStartMinutes = h * 60 + m;
          if (slotStartMinutes + SLOT_MINUTES > WORK_END_HOUR * 60) continue;

          const slotEnd = addMinutes(slotStart, SLOT_MINUTES);

          const conflict = existIntervals.some(iv => (slotStart < iv.end && slotEnd > iv.start));
          if (!conflict) {
            chosenSlot = { start: slotStart, end: slotEnd };
            break;
          }
        }
      }
    }

    if (!chosenSlot) {
      throw new Error('Aucun créneau de 30 minutes disponible dans l’unité pendant la période demandée');
    }

    // 7) insertion unite_entretiens
    const newUniteEntretien = await UniteEntretien.create({
      id_candidat,
      id_unite,
      date_entretien: chosenSlot.start,
      duree: SLOT_MINUTES
    }, { transaction });

    // 8) insertion status_unite_entretien (id_type_status_entretien = 1)
    await StatusUniteEntretien.create({
      id_unite_entretien: newUniteEntretien.id_unite_entretien || newUniteEntretien.id,
      id_type_status_entretien: 1,
      date_changement: new Date()
    }, { transaction });

    // 9) récupérer candidat et tiers
    const candidatRow = await Candidat.findOne({ where: { id_candidat }, transaction });
    if (!candidatRow) throw new Error('Candidat introuvable');

    const tiers = await Tiers.findOne({ where: { id_tiers: candidatRow.id_tiers }, transaction });

    // si email absent, commit et retourner
    if (!tiers || !tiers.email) {
      await transaction.commit();
      return {
        scheduled: {
          id_unite_entretien: newUniteEntretien.id_unite_entretien || newUniteEntretien.id,
          date_entretien: chosenSlot.start,
          duree: SLOT_MINUTES
        },
        mailSent: false,
        message: 'Entretien créé mais e-mail du candidat introuvable'
      };
    }

    const candidateEmail = tiers.email;

    // ----------------------------------------------------------------
    // === ici : construction du mail à la manière de sendQcmCandidat ===
    // ----------------------------------------------------------------

    // récupérer le template mail id = 2
    const mailTemplate = await Mail.findByPk(2, { transaction });
    const corpsRows = await CorpsMail.findAll({
      where: { id_mail: 2 },
      order: [['id_corps_mail', 'ASC']],
      transaction
    });

    // convertir en tableau de parties (strings)
    const parts = corpsRows.map(r => (r && r.corps) ? r.corps.toString() : '');

    // récupérer le score obtenu par le candidat (dernier enregistrement de reponse_qcm_candidats lié aux envois)
    let scoreObtained = null;
    if (envoiIds && envoiIds.length > 0) {
      const lastResponseWithScore = await ReponseQcmCandidat.findOne({
        where: { id_envoi_qcm_candidat: { [Op.in]: envoiIds } },
        order: [['fin', 'DESC']],
        transaction
      });
      if (lastResponseWithScore && typeof lastResponseWithScore.score !== 'undefined') {
        scoreObtained = lastResponseWithScore.score;
      }
    }

    // formater date entretien
    const formattedDate = formatDateTime(chosenSlot.start);

    // concaténer score + date au 2e bloc (index 1)
    const scoreLine = `Score obtenu : ${scoreObtained !== null ? scoreObtained : 'N/A'}`;
    const dateLine = `Date de l'entretien : ${formattedDate}`;
    if (parts.length >= 2) {
      parts[1] = parts[1].trim() + '\n\n' + scoreLine + '\n' + dateLine;
    } else {
      // si pas assez de parties, on s'assure d'au moins avoir les deux champs
      while (parts.length < 2) parts.push('');
      parts[1] = (parts[1] || '') + '\n\n' + scoreLine + '\n' + dateLine;
    }

    // remplacer placeholders courants s'ils existent (ex: {{nom}}, {{date_entretien}}, {{unite}})
    let mailBody = parts.join('\n\n').trim();
    const subject = mailTemplate ? (mailTemplate.objet || 'Invitation entretien') : 'Invitation entretien';

    // récupérer nom de l'unite
    let uniteName = null;
    try {
      const uniteRow = await db.query(
        'SELECT nom FROM unites WHERE id_unite = $1',
        { bind: [id_unite], type: db.QueryTypes.SELECT, transaction }
      );
      if (Array.isArray(uniteRow) && uniteRow.length > 0) uniteName = uniteRow[0].nom;
    } catch (e) { /* ignore si échec */ }

    mailBody = mailBody
      .replace(/\{\{nom\}\}/g, `${tiers.nom || ''} ${tiers.prenom || ''}`)
      .replace(/\{\{date_entretien\}\}/g, formattedDate)
      .replace(/\{\{unite\}\}/g, uniteName || `Unité ${id_unite}`)
      .replace(/\{\{score\}\}/g, scoreObtained !== null ? String(scoreObtained) : 'N/A');

    // récupérer l'adresse d'envoi et mot de passe de la table adresse_mail si présente
    let senderRow = null;
    try {
      senderRow = await AdresseMail.findOne({ transaction });
    } catch (e) { /* ignore */ }

    let senderEmail = process.env.SMTP_USER || (senderRow && senderRow.valeur) || null;
    let senderPass = process.env.SMTP_PASS || (senderRow && senderRow.mot_de_passe) || null;

    if (!senderEmail) {
      await transaction.commit();
      throw new Error('Adresse d’envoi non configurée (adresse_mail en base ou process.env.SMTP_USER manquante)');
    }

    // config nodemailer : privilégier les infos en env sinon celles en base
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
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

    const mailOptions = {
      from: senderEmail,
      to: candidateEmail,
      subject,
      text: mailBody,
      html: mailBody
    };

    let mailSent = false;
    try {
      await transporter.sendMail(mailOptions);
      mailSent = true;
    } catch (mailErr) {
      console.error('Erreur envoi mail entretien:', mailErr && mailErr.message ? mailErr.message : mailErr);
      mailSent = false;
    }

    // commit transaction (RDV + status déjà créés)
    await transaction.commit();

    return {
      scheduled: {
        id_unite_entretien: newUniteEntretien.id_unite_entretien || newUniteEntretien.id,
        date_entretien: chosenSlot.start,
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
