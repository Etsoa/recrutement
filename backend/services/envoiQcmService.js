const Candidat = require('../models/candidatsModel');
const Tiers = require('../models/tiersModel');
const Annonce = require('../models/annoncesModel');
const Poste = require('../models/postesModel');
const EnvoiQcmCandidat = require('../models/envoiQcmCandidatsModel');
const ReponseQcmCandidat = require('../models/reponseQcmCandidatsModel');
const QcmAnnonce = require('../models/qcmAnnoncesModel');
const QuestionQcm = require('../models/questionQcmsModel');
const ReponseQcm = require('../models/reponseQcmsModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configuration du transporteur email (à adapter selon votre fournisseur)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, 
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

async function createEnvoiQcm(id_candidat) {
  try {
    // Récupérer les informations du candidat et de l'annonce
    const candidat = await Candidat.findOne({
      where: { id_candidat },
      include: [
        {
          model: Tiers,
          attributes: ['nom', 'prenom', 'email']
        },
        {
          model: Annonce,
          include: [
            {
              model: Poste,
              attributes: ['valeur']
            }
          ]
        }
      ]
    });

    if (!candidat) {
      throw new Error('Candidat introuvable');
    }

    console.log('=== DEBUG CANDIDAT ===');
    console.log('candidat:', candidat ? 'trouvé' : 'null');
    console.log('tiers:', candidat.Tiers ? 'trouvé' : 'null/undefined');
    console.log('candidat.Annonce:', candidat.Annonce ? 'trouvé' : 'null/undefined');
    if (candidat.Tiers) {
      console.log('Tiers nom:', candidat.Tiers.nom);
      console.log('Tiers email:', candidat.Tiers.email);
    }
    if (candidat.Annonce && candidat.Annonce.Poste) {
      console.log('Poste:', candidat.Annonce.Poste.valeur);
    }

    // Générer un token JWT unique et sécurisé
    const payload = {
      id_candidat,
      id_annonce: candidat.id_annonce,
      type: 'qcm',
      iat: Math.floor(Date.now() / 1000)
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { 
      expiresIn: '1D' // Le token expire dans 7 jours
    });
    
    // Calculer la date d'expiration du token (1 jour)
    const dateExpiration = new Date();
    dateExpiration.setDate(dateExpiration.getDate() + 1);

    // Créer l'enregistrement d'envoi QCM avec URL localhost
    const lienQcm = `http://localhost:3000/qcm/${token}`;
    console.log(`Lien QCM généré: ${lienQcm}`);
    
    const envoiQcm = await EnvoiQcmCandidat.create({
      id_candidat,
      lien: lienQcm,
      token,
      date_envoi: new Date()
    });

    // Préparer les données pour l'email
    const emailData = {
      nom: candidat.Tiers.nom,
      prenom: candidat.Tiers.prenom,
      email: candidat.Tiers.email,
      poste: candidat.Annonce.Poste.valeur,
      token: token,
      lienQcm: lienQcm
    };

    // Envoyer l'email
    await envoyerEmailQcm(emailData);

    return {
      id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat,
      token,
      date_envoi: envoiQcm.date_envoi,
      email_envoye: emailData.email,
      lien_qcm: lienQcm
    };

  } catch (error) {
    console.error('Erreur createEnvoiQcm:', error);
    throw error;
  }
}

async function envoyerEmailQcm(emailData) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: emailData.email,
      subject: `QCM - Candidature pour le poste ${emailData.poste}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Bonjour ${emailData.prenom} ${emailData.nom},</h2>
          
          <p>Nous avons le plaisir de vous informer que votre candidature pour le poste <strong>${emailData.poste}</strong> a retenu notre attention.</p>
          
          <p>Afin de poursuivre le processus de recrutement, nous vous invitons à passer un QCM en ligne.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${emailData.lienQcm}" 
               style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Commencer le QCM
            </a>
          </div>
          
          <p><strong>Important :</strong></p>
          <ul>
            <li>Ce lien est personnel et ne peut être utilisé qu'une seule fois</li>
            <li>Le QCM doit être complété avant le ${new Date(emailData.dateExpiration || Date.now() + 7*24*60*60*1000).toLocaleDateString('fr-FR')}</li>
            <li>Une fois commencé, vous devez terminer le QCM en une seule fois</li>
          </ul>
          
          <p>Si vous rencontrez des difficultés, n'hésitez pas à nous contacter.</p>
          
          <p>Bonne chance !</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email QCM envoyé:', info.messageId);
    return info;

  } catch (error) {
    console.error('Erreur envoi email QCM:', error);
    throw error;
  }
}

async function verifyTokenQcm(token) {
  try {
    console.log('🔍 Début vérification token:', token.substring(0, 50) + '...');
    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔍 Token JWT décodé:', {
      id_candidat: decoded.id_candidat,
      id_annonce: decoded.id_annonce,
      type: decoded.type,
      exp: decoded.exp,
      iat: decoded.iat
    });
    
    // Vérifier que c'est bien un token QCM
    if (decoded.type !== 'qcm') {
      console.log('🔴 Token type incorrect:', decoded.type);
      return { 
        error: 'TOKEN_INVALID',
        message: 'Ce lien est invalide'
      };
    }

    // Vérifier si un envoi QCM existe déjà pour ce token (usage unique)
    console.log('🔍 Recherche token dans base de données:', token);
    let envoiQcm = await EnvoiQcmCandidat.findOne({
      where: { token: token }
    });
    console.log('🔍 Résultat recherche token:', envoiQcm ? 'déjà existant' : 'nouveau');

    // Si le token n'existe pas encore, créer l'entrée (premier clic sur le lien)
    if (!envoiQcm) {
      console.log('� Première utilisation du token, création de l\'entrée...');
      try {
        envoiQcm = await EnvoiQcmCandidat.create({
          id_candidat: decoded.id_candidat,
          token: token,
          lien: `${process.env.FRONTEND_URL}/qcm?token=${token}`,
          date_envoi: new Date()
        });
        console.log('🟢 Entrée envoi QCM créée avec succès, id:', envoiQcm.id_envoi_qcm_candidat);
      } catch (createError) {
        console.error('🔴 Erreur création envoi QCM:', createError);
        return {
          error: 'TOKEN_CREATE_ERROR',
          message: 'Erreur lors de l\'initialisation du QCM'
        };
      }
    }

    // RÈGLE MÉTIER : Vérifier si le token a déjà été utilisé en checkant reponse_qcm_candidats
    console.log('🔍 Vérification usage unique pour id_envoi:', envoiQcm.id_envoi_qcm_candidat);
    const reponsesExistantes = await ReponseQcmCandidat.findOne({
      where: { id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat }
    });
    console.log('🔍 Réponses existantes:', reponsesExistantes ? 'oui (déjà utilisé)' : 'non (première fois)');

    if (reponsesExistantes) {
      console.log('🔴 Token déjà utilisé');
      return { 
        error: 'TOKEN_ALREADY_USED',
        message: 'Ce lien a déjà été utilisé et ne peut plus être accessible'
      };
    }

    // Récupérer les informations du candidat avec requêtes séparées pour éviter les problèmes d'associations
    const candidat = await Candidat.findByPk(decoded.id_candidat);

    if (!candidat) {
      return { 
        error: 'CANDIDAT_NOT_FOUND',
        message: 'Candidat introuvable'
      };
    }

    // Vérifier que le candidat est bien associé à l'annonce du token
    if (candidat.id_annonce !== decoded.id_annonce) {
      return { 
        error: 'TOKEN_ANNONCE_MISMATCH',
        message: 'Token non valide pour cette annonce'
      };
    }

    // Récupérer les informations du tiers séparément
    const tiers = await Tiers.findByPk(candidat.id_tiers, {
      attributes: ['nom', 'prenom']
    });

    if (!tiers) {
      return { 
        error: 'TIERS_NOT_FOUND',
        message: 'Informations candidat introuvables'
      };
    }

    // Récupérer les informations de l'annonce et du poste séparément
    const annonce = await Annonce.findByPk(candidat.id_annonce, {
      include: [
        {
          model: Poste,
          attributes: ['valeur']
        }
      ]
    });

    if (!annonce || !annonce.Poste) {
      return { 
        error: 'ANNONCE_NOT_FOUND',
        message: 'Informations annonce introuvables'
      };
    }

    return {
      id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat,
      id_candidat: decoded.id_candidat,
      id_annonce: decoded.id_annonce,
      nom: tiers.nom,
      prenom: tiers.prenom,
      poste: annonce.Poste.valeur,
      token_valide: true
    };

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('Token QCM expiré');
      return { 
        error: 'TOKEN_EXPIRED',
        message: 'Ce lien a expiré'
      };
    } else if (error.name === 'JsonWebTokenError') {
      console.log('Token QCM invalide');
      return { 
        error: 'TOKEN_INVALID',
        message: 'Ce lien est invalide'
      };
    } else {
      console.error('Erreur verifyTokenQcm:', error);
      return { 
        error: 'INTERNAL_ERROR',
        message: 'Erreur interne'
      };
    }
  }
}

// Supprimer cette fonction car on n'utilise plus est_utilise
// La vérification se fait maintenant via reponse_qcm_candidats

async function creerReponseQcmAbandon(id_envoi_qcm_candidat, id_annonce) {
  try {
    console.log('Création des réponses d\'abandon pour le QCM:', { id_envoi_qcm_candidat, id_annonce });
    
    // Récupérer l'heure de début du placeholder si elle existe
    const placeholderReponse = await ReponseQcmCandidat.findOne({
      where: { 
        id_envoi_qcm_candidat,
        id_qcm_annonce: null,
        score: null
      }
    });
    
    const debutQcm = placeholderReponse ? placeholderReponse.debut : new Date();
    const finQcm = new Date();
    const dureeQcm = Math.floor((finQcm - debutQcm) / 1000); // durée en secondes

    // Supprimer le placeholder s'il existe
    if (placeholderReponse) {
      await ReponseQcmCandidat.destroy({
        where: { 
          id_envoi_qcm_candidat,
          id_qcm_annonce: null,
          score: null
        }
      });
    }

    // RÈGLE MÉTIER : Si candidat sort sans finir, score = 0
    // Récupérer toutes les questions de l'annonce
    const questionsQcm = await QcmAnnonce.findAll({
      where: { id_annonce }
    });

    // Créer des réponses avec score 0 pour toutes les questions
    const reponsesAbandon = questionsQcm.map(qcmAnnonce => ({
      id_envoi_qcm_candidat,
      id_qcm_annonce: qcmAnnonce.id_qcm_annonce,
      debut: debutQcm,
      fin: finQcm,
      duree: dureeQcm,
      score: 0
    }));

    // Insérer toutes les réponses d'abandon
    await ReponseQcmCandidat.bulkCreate(reponsesAbandon);

    return {
      message: 'QCM marqué comme abandonné avec score 0',
      total_questions: questionsQcm.length,
      score_final: 0
    };

  } catch (error) {
    console.error('Erreur creerReponseQcmAbandon:', error);
    throw error;
  }
}

async function checkQcmCompleted(id_envoi_qcm_candidat) {
  try {
    // Vérifier s'il existe des réponses pour cet envoi QCM
  const reponses = await ReponseQcmCandidat.findOne({
      where: { id_envoi_qcm_candidat }
    });

    return !!reponses; // Retourne true si des réponses existent
  } catch (error) {
    console.error('Erreur checkQcmCompleted:', error);
    throw error;
  }
}

async function getQcmQuestionsByToken(token) {
  try {
    // D'abord vérifier le token
    const verification = await verifyTokenQcm(token);
    
    if (!verification || verification.error) {
      return verification; // Retourner l'erreur si le token n'est pas valide
    }
    
    // Récupérer les questions QCM spécifiques à cette annonce avec leurs réponses
  const questionsQcm = await QcmAnnonce.findAll({
      where: { id_annonce: verification.id_annonce },
      include: [
        {
          model: QuestionQcm,
          include: [
            {
              model: ReponseQcm,
              attributes: ['id_reponse_qcm', 'reponse']
            }
          ]
        }
      ],
      order: [
        ['id_qcm_annonce', 'ASC'],
        [QuestionQcm, ReponseQcm, 'id_reponse_qcm', 'ASC']
      ]
    });
    
    // Formater les données pour le frontend
    const questions = questionsQcm.map(qcmAnnonce => ({
      id_qcm_annonce: qcmAnnonce.id_qcm_annonce,
      id_question: qcmAnnonce.QuestionQcm.id_question,
      question: qcmAnnonce.QuestionQcm.intitule,
      reponses: qcmAnnonce.QuestionQcm.ReponseQcms.map(reponse => ({
        id_reponse: reponse.id_reponse_qcm,
        texte: reponse.reponse
      }))
    }));
    
    return {
      candidat: {
        id_candidat: verification.id_candidat,
        nom: verification.nom,
        prenom: verification.prenom,
        poste: verification.poste
      },
      questions,
      id_envoi_qcm_candidat: verification.id_envoi_qcm_candidat,
      total_questions: questions.length
    };
    
  } catch (error) {
    console.error('Erreur getQcmQuestionsByToken:', error);
    throw error;
  }
}

module.exports = {
  createEnvoiQcm,
  verifyTokenQcm,
  creerReponseQcmAbandon,
  getQcmQuestionsByToken,
  checkQcmCompleted
};
