const CeoView = require('../models/ceoViewModel');
const CeoSuggestions = require('../models/ceoSuggestionsModel');
const RhEntretien = require('../models/rhEntretiensModel');
const Candidats = require('../models/candidatsModel');
const Tiers = require('../models/tiersModel');
const CeoEmployesView = require('../models/ceoEmployesViewModel');
const ContratEssai = require('../models/contratEssaisModel');
const ContratEssaisService = require('./contratEssaisService');
const Annonces = require('../models/annoncesModel');
const Postes = require('../models/postesModel');
const EmployesService = require('../services/employesService');
const nodemailer = require('nodemailer');
const Poste = require('../models/postesModel')

const loginCeo = async (email, mot_de_passe) => {
  const type_status_employe = 'Actif';
  const whereClause = {
    email,
    mot_de_passe,
    type_status_employe
  }

  return await CeoView.findOne({ where: whereClause });
};

// Afaka atsaraina ampiana kokoa ilay info an'le Tiers
const getAllSuggests = async () => {
  const suggestions = await CeoSuggestions.findAll({
    include: [
      {
        model: RhEntretien,
        as: 'RhEntretien',
        attributes: ['id_rh_entretien', 'date_entretien', 'duree']
      },
      {
        model: Candidats,
        as: 'Candidat',
        include: [
          {
            model: Tiers,
            as: 'Tier',
            attributes: ['nom', 'prenom', 'email']
          }
        ]
      }
    ],
    order: [['date_suggestion', 'DESC']]
  });


  return suggestions;
};

const getAllEmployes = async () => {
  const employes = await CeoEmployesView.findAll({
    include: [
      {
        model: ContratEssai,
        attributes: ["id_contrat_essai", "date_debut", "duree"]
      }
    ]
  });
  return employes;
}

const getEmpEnContratDEssai = async () => {
  const employes = await CeoEmployesView.findAll({
    include: [
      {
        model: ContratEssai,
        attributes: ["id_contrat_essai", "date_debut", "duree"]
      }
    ],
    where: { id_type_status_employe: 6 } // Tokony hoe 6 ny en contrat d'essaie
  });
  return employes;
}

const getAllSuggestsWaitingValidation = async () => {
  const suggestions = await CeoSuggestions.findAll({
    include: [
      {
        model: RhEntretien,
        as: 'RhEntretien',
        attributes: ['id_rh_entretien', 'date_entretien', 'duree']
      },
      {
        model: Candidats,
        as: 'Candidat',
        include: [
          {
            model: Tiers,
            as: 'Tier',
            attributes: ['nom', 'prenom', 'email']
          },
          {
            model: Annonces,
            as: 'Annonce',
            attributes: ['id_annonce'],
            include: [{
              model: Postes,
              as: 'Poste',
              attributes: ['id_poste']
            }]
          }
        ]
      }
    ],
    order: [['date_suggestion', 'DESC']],
    where: { id_type_status_suggestion: 3 } // Ito no important sy mila jerena hoe 3 tokoa ve ny en attente
  });

  return suggestions;
};

const refuserSuggestion = async (id_ceo_suggestion) => {
  try {
    const suggestion = await CeoSuggestions.findByPk(id_ceo_suggestion);

    if (!suggestion) {
      return {
        success: false,
        message: "Suggestion introuvable"
      };
    }

    // Mise à jour du statut à 2 (refusé)
    await suggestion.update({ id_type_status_suggestion: 2 });

    return {
      success: true,
      message: "Suggestion refusée avec succès"
    };
  } catch (error) {
    console.error("Erreur refuserSuggestion:", error);
    return {
      success: false,
      message: "Erreur lors du refus de la suggestion",
      error: error.message
    };
  }
}

// Fonction be parametre be, azfd fa reraka loatra hiasa saina fa io izy aloha
const accepterSuggestion = async (id_ceo_suggestion, date_debut, duree, id_poste, id_tiers) => {
  try {
    const suggestion = await CeoSuggestions.findByPk(id_ceo_suggestion);

    if (!suggestion) {
      return {
        success: false,
        message: "Suggestion introuvable"
      };
    }

    // Mise à jour du statut à 1 (valide)
    await suggestion.update({ id_type_status_suggestion: 1 });

    // id_type_status_employe tokony 6 ny en contrat d'essai
    emp = await EmployesService.createEmploye({ id_tiers: id_tiers, id_type_status_employe: 6, id_poste: id_poste })

    await ContratEssaisService.createContratEssai({ id_employe: emp.id_employe, date_debut: date_debut, duree: duree });

    const poste = await Poste.findByPk(id_poste);
    const tiers = await Tiers.findByPk(id_tiers);

    emailData = {
      date_debut: date_debut,
      duree: duree,
      poste: poste.valeur,
      nom: tiers.nom,
      prenom: tiers.prenom,
      email: tiers.email
    }

    await envoyerContratMail(emailData);

    return {
      success: true,
      message: "Suggestion accepté avec succès"
    };
  } catch (error) {
    // console.error("Erreur accepterSuggestion:", error);
    return {
      success: false,
      message: "Erreur lors de la validation de la suggestion",
      error: error.message
    };
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const envoyerContratMail = async (emailData) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: emailData.email,
      subject: `Contrat d'essaie pour le poste ${emailData.poste}`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50;">Bonjour ${emailData.prenom} ${emailData.nom},</h2>
          
          <p>Nous avons le plaisir de vous informer que vous êtes retenu pour un <strong>contrat d'essai</strong> au poste de 
          <strong>${emailData.poste}</strong>.</p>
          
          <p>Voici les détails de votre contrat d'essai :</p>
          
          <table style="border-collapse: collapse; margin: 15px 0; width: 100%; max-width: 600px;">
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;"><strong>Date de début</strong></td>
              <td style="border: 1px solid #ccc; padding: 8px;">${emailData.date_debut}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;"><strong>Durée</strong></td>
              <td style="border: 1px solid #ccc; padding: 8px;">${emailData.duree} mois</td>
            </tr>
          </table>
          
          <p>Nous comptons sur votre implication et espérons que cette période d’essai sera concluante pour les deux parties.</p>
          
          <p style="margin-top: 20px;">Cordialement,</p>
          <p><strong>L'équipe RH</strong></p>
    </div>`
    };

    const info = await transporter.sendMail(mailOptions);
    return info;

  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw error;
  }
}

module.exports = {
  loginCeo,
  getAllSuggests,
  getAllEmployes,
  getAllSuggestsWaitingValidation,
  refuserSuggestion,
  accepterSuggestion,
  getEmpEnContratDEssai
}