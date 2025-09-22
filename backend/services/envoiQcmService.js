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

    // Récupérer les informations du tiers séparément
    const tiers = await Tiers.findByPk(candidat.id_tiers, {
      attributes: ['nom', 'prenom', 'email']
    });

    if (!tiers) {
      throw new Error('Tiers introuvable');
    }

    console.log('=== DEBUG CANDIDAT ===');
    console.log('candidat:', candidat ? 'trouvé' : 'null');
    console.log('tiers:', tiers ? 'trouvé' : 'null/undefined');
    console.log('candidat.Annonce:', candidat.Annonce ? 'trouvé' : 'null/undefined');
    if (tiers) {
      console.log('Tiers nom:', tiers.nom);
      console.log('Tiers email:', tiers.email);
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
    
    // Calculer la date d'expiration du token (7 jours)
    const dateExpiration = new Date();
    dateExpiration.setDate(dateExpiration.getDate() + 1);

    // Créer l'enregistrement d'envoi QCM selon la structure existante
    const lienQcm = `${process.env.FRONTEND_URL}/qcm/${token}`;
    
  const envoiQcm = await EnvoiQcmCandidat.create({
      id_candidat,
      lien: lienQcm,
      token,
      date_envoi: new Date()
    });

    // Préparer les données pour l'email
    const emailData = {
      nom: tiers.nom,
      prenom: tiers.prenom,
      email: tiers.email,
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
    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier que c'est bien un token QCM
    if (decoded.type !== 'qcm') {
      return { 
        error: 'TOKEN_INVALID',
        message: 'Ce lien est invalide'
      };
    }

    // Vérifier si un envoi QCM existe déjà pour ce token
    let envoiQcm = await EnvoiQcmCandidat.findOne({
      where: { token: token }
    });

    console.log('=== DEBUG TOKEN CHECK ===');
    console.log('Token recherché:', token);
    console.log('EnvoiQcm trouvé:', envoiQcm ? 'OUI' : 'NON');
    if (envoiQcm) {
      console.log('EnvoiQcm ID:', envoiQcm.id_envoi_qcm_candidat);
      console.log('EnvoiQcm date_envoi:', envoiQcm.date_envoi);
    }

    // Si le token n'existe pas encore en base, l'insérer
    if (!envoiQcm) {
      try {
        // Créer l'URL du QCM
        const lienQcm = `${process.env.FRONTEND_URL}/qcm/${token}`;
        
        envoiQcm = await EnvoiQcmCandidat.create({
          id_candidat: decoded.id_candidat,
          lien: lienQcm,
          token: token,
          date_envoi: new Date()
        });
        
        console.log('Token inséré en base:', envoiQcm.id_envoi_qcm_candidat);
        
        // Trouver le QCM associé à cette annonce
        const qcmAnnonce = await QcmAnnonce.findOne({
          where: { id_annonce: decoded.id_annonce }
        });
        
        if (!qcmAnnonce) {
          console.error('Aucun QCM trouvé pour l\'annonce:', decoded.id_annonce);
          return { 
            error: 'NO_QCM_FOR_ANNONCE',
            message: 'Aucun QCM configuré pour cette annonce'
          };
        }
        
        console.log('QCM trouvé pour annonce:', decoded.id_annonce, '=> QCM ID:', qcmAnnonce.id_qcm_annonce);
        
        // Créer un enregistrement initial dans reponse_qcm_candidats pour marquer le début du QCM
        const reponseQcmCreated = await ReponseQcmCandidat.create({
          id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat,
          id_qcm_annonce: qcmAnnonce.id_qcm_annonce, // Correct ID de qcm_annonces
          debut: new Date(), // Datetime de commencement du QCM
          fin: null, // Sera mis à jour à la fin du QCM
          duree: null, // Sera calculée à la fin du QCM
          score: null // Sera calculé à la fin du QCM
        });
        
        console.log('ReponseQcmCandidat créé:', reponseQcmCreated.id_reponse_qcm_candidat);
        
      } catch (insertError) {
        console.error('Erreur insertion token:', insertError);
        return { 
          error: 'TOKEN_INSERT_ERROR',
          message: 'Erreur lors de l\'enregistrement du token'
        };
      }
    } else {
      console.log('=== TOKEN EXISTE DÉJÀ ===');
      
      // Le token existe, vérifier si le QCM est déjà terminé
      let reponseQcm = await ReponseQcmCandidat.findOne({
        where: { id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat }
      });
      
      console.log('ReponseQcm trouvée:', reponseQcm ? 'OUI' : 'NON');
      if (reponseQcm) {
        console.log('Score actuel:', reponseQcm.score);
        console.log('Debut:', reponseQcm.debut);
        console.log('Fin:', reponseQcm.fin);
        console.log('Duree:', reponseQcm.duree);
      }
      
      // Si le QCM est terminé (score non null), refuser l'accès
      if (reponseQcm && reponseQcm.score !== null) {
        console.log('REFUS - QCM déjà complété avec score:', reponseQcm.score);
        return { 
          error: 'TOKEN_ALREADY_COMPLETED',
          message: 'Ce QCM a déjà été complété'
        };
      }
      
      // Si pas de reponseQcm, créer l'enregistrement pour marquer le début du QCM
      if (!reponseQcm) {
        console.log('=== CRÉATION REPONSE QCM MANQUANTE ===');
        
        // Trouver le QCM associé à cette annonce
        const qcmAnnonce = await QcmAnnonce.findOne({
          where: { id_annonce: decoded.id_annonce }
        });
        
        if (!qcmAnnonce) {
          console.error('Aucun QCM trouvé pour l\'annonce:', decoded.id_annonce);
          return { 
            error: 'NO_QCM_FOR_ANNONCE',
            message: 'Aucun QCM configuré pour cette annonce'
          };
        }
        
        console.log('QCM trouvé pour annonce:', decoded.id_annonce, '=> QCM ID:', qcmAnnonce.id_qcm_annonce);
        
        // Créer l'enregistrement dans reponse_qcm_candidats
        reponseQcm = await ReponseQcmCandidat.create({
          id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat,
          id_qcm_annonce: qcmAnnonce.id_qcm_annonce,
          debut: new Date(),
          fin: null,
          duree: null,
          score: null
        });
        
        console.log('ReponseQcmCandidat créé avec ID:', reponseQcm.id_reponse_qcm_candidat);
      }
      
      // Sinon, permettre l'accès (QCM en cours)
      console.log('AUTORISATION - QCM en cours, score null');
      console.log('Token réutilisé - QCM en cours:', envoiQcm.id_envoi_qcm_candidat);
    }

    return {
      id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat,
      id_candidat: decoded.id_candidat,
      id_annonce: decoded.id_annonce,
      token_valide: true,
      token_inserted: !envoiQcm.date_envoi
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

// Calculer le score du QCM et finaliser
async function calculateQcmScore(id_envoi_qcm_candidat, id_annonce, reponses, duree) {
  try {
    // Récupérer toutes les questions liées à cette annonce avec TOUTES leurs réponses
    const qcmAnnonces = await QcmAnnonce.findAll({
      where: { id_annonce: id_annonce },
      include: [{
        model: QuestionQcm,
        include: [{
          model: ReponseQcm,
          // Récupérer TOUTES les réponses, pas seulement les bonnes
        }]
      }]
    });

    if (!qcmAnnonces || qcmAnnonces.length === 0) {
      return {
        error: 'NO_QUESTIONS',
        message: 'Aucune question trouvée pour cette annonce'
      };
    }

    console.log('=== CALCUL SCORE QCM ===');
    console.log('Questions trouvées:', qcmAnnonces.length);
    console.log('Réponses candidat:', reponses);

    let totalBonnesReponsesPossibles = 0;
    let bonnesReponsesCandidat = 0;

    // Pour chaque question du QCM
    for (const qcmAnnonce of qcmAnnonces) {
      const question = qcmAnnonce.QuestionQcm;
      const questionId = question.id_question;
      const toutesReponses = question.ReponseQcms || [];
      
      // Filtrer les bonnes réponses
      const bonnesReponses = toutesReponses.filter(r => r.modalite === true);
      totalBonnesReponsesPossibles += bonnesReponses.length;
      
      console.log(`Question ${questionId}:`, {
        bonnesReponses: bonnesReponses.map(r => r.id_reponse_qcm),
        reponsesCandidat: reponses[questionId] || []
      });

      // Vérifier les réponses du candidat pour cette question
      const reponsesCandidat = reponses[questionId] || [];
      
      if (Array.isArray(reponsesCandidat)) {
        // Convertir les lettres (a, b, c, d) en IDs réels de réponses
        for (const lettre of reponsesCandidat) {
          // Convertir la lettre en index (a=0, b=1, c=2, d=3)
          const index = lettre.charCodeAt(0) - 97; // 'a'.charCodeAt(0) = 97
          
          // Vérifier que l'index est valide
          if (index >= 0 && index < toutesReponses.length) {
            const reponseId = toutesReponses[index].id_reponse_qcm;
            const estBonneReponse = bonnesReponses.some(br => br.id_reponse_qcm === reponseId);
            
            console.log(`  Lettre '${lettre}' (index ${index}) -> ID réponse ${reponseId} -> ${estBonneReponse ? 'BONNE' : 'mauvaise'}`);
            
            if (estBonneReponse) {
              bonnesReponsesCandidat++;
            }
          }
        }
      }
    }

    console.log('Calcul final:', {
      bonnesReponsesCandidat,
      totalBonnesReponsesPossibles
    });

    // Calculer le score sur 20
    const scoreMax = 20;
    const score = totalBonnesReponsesPossibles > 0 
      ? Math.round((bonnesReponsesCandidat / totalBonnesReponsesPossibles) * scoreMax)
      : 0;
    
    const pourcentage = totalBonnesReponsesPossibles > 0 
      ? Math.round((bonnesReponsesCandidat / totalBonnesReponsesPossibles) * 100)
      : 0;

    // Mettre à jour la table reponse_qcm_candidats avec le score final
    const dateFinQcm = new Date();
    console.log('=== MISE À JOUR SCORE QCM ===');
    console.log('ID envoi QCM candidat:', id_envoi_qcm_candidat);
    console.log('Date fin:', dateFinQcm);
    console.log('Durée (secondes):', duree);
    console.log('Score calculé:', score);
    
    const updateResult = await ReponseQcmCandidat.update({
      fin: dateFinQcm,
      duree: duree,
      score: score
    }, {
      where: { id_envoi_qcm_candidat: id_envoi_qcm_candidat }
    });

    console.log('Nombre de lignes mises à jour:', updateResult[0]);
    
    // Vérifier que la mise à jour a bien eu lieu
    const reponseQcmUpdated = await ReponseQcmCandidat.findOne({
      where: { id_envoi_qcm_candidat: id_envoi_qcm_candidat }
    });
    
    console.log('=== VÉRIFICATION APRÈS MISE À JOUR ===');
    if (reponseQcmUpdated) {
      console.log('Début:', reponseQcmUpdated.debut);
      console.log('Fin:', reponseQcmUpdated.fin);
      console.log('Durée:', reponseQcmUpdated.duree);
      console.log('Score:', reponseQcmUpdated.score);
    } else {
      console.log('ERREUR: Aucun enregistrement trouvé après mise à jour!');
    }

    console.log('Score final calculé:', {
      score,
      scoreMax,
      pourcentage,
      bonnesReponsesCandidat,
      totalBonnesReponsesPossibles
    });

    return {
      score,
      scoreMax,
      pourcentage,
      bonnesReponses: bonnesReponsesCandidat,
      totalReponses: totalBonnesReponsesPossibles
    };

  } catch (error) {
    console.error('Erreur calculateQcmScore:', error);
    return {
      error: 'CALCULATION_ERROR',
      message: 'Erreur lors du calcul du score'
    };
  }
}

module.exports = {
  createEnvoiQcm,
  verifyTokenQcm,
  calculateQcmScore
};
