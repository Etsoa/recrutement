const nodemailer = require('nodemailer');
const MailsModel = require('../../models/mailsModel');
const AdresseMailModel = require('../../models/adresseMailModel');
const CorpsMailsModel = require('../../models/corpsMailsModel');

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'localhost',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendEmail(to, subject, content, type = 'html') {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@gestionentreprise.com',
        to: to,
        subject: subject,
        [type]: content
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      // Enregistrer l'email envoyé en base
      await this.logEmail(to, subject, content, 'sent');
      
      return result;
    } catch (error) {
      // Enregistrer l'erreur en base
      await this.logEmail(to, subject, content, 'failed', error.message);
      throw new Error(`Erreur lors de l'envoi de l'email : ${error.message}`);
    }
  }

  async sendQcmToCandidate(candidatId, candidatEmail, qcmDetails) {
    try {
      const subject = 'QCM - Processus de recrutement';
      const content = await this.generateQcmEmailContent(candidatId, qcmDetails);
      
      return await this.sendEmail(candidatEmail, subject, content);
    } catch (error) {
      throw new Error(`Erreur lors de l'envoi du QCM au candidat : ${error.message}`);
    }
  }

  async sendEntretienInvitation(candidatId, candidatEmail, entretienDetails) {
    try {
      const subject = 'Invitation à un entretien';
      const content = await this.generateEntretienEmailContent(candidatId, entretienDetails);
      
      return await this.sendEmail(candidatEmail, subject, content);
    } catch (error) {
      throw new Error(`Erreur lors de l'envoi de l'invitation à l'entretien : ${error.message}`);
    }
  }

  async generateQcmEmailContent(candidatId, qcmDetails) {
    try {
      // Récupérer le template de mail pour QCM
      const template = await CorpsMailsModel.getByType('qcm');
      
      if (template) {
        // Remplacer les variables dans le template
        let content = template.contenu;
        content = content.replace(/\{candidat_id\}/g, candidatId);
        content = content.replace(/\{qcm_link\}/g, qcmDetails.link || '#');
        content = content.replace(/\{deadline\}/g, qcmDetails.deadline || 'À déterminer');
        
        return content;
      } else {
        // Template par défaut
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>QCM - Processus de recrutement</h2>
            <p>Bonjour,</p>
            <p>Nous avons le plaisir de vous informer que votre candidature a retenu notre attention.</p>
            <p>Veuillez cliquer sur le lien suivant pour accéder au QCM :</p>
            <p><a href="${qcmDetails.link || '#'}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accéder au QCM</a></p>
            <p>Date limite : ${qcmDetails.deadline || 'À déterminer'}</p>
            <p>Cordialement,<br>L'équipe RH</p>
          </div>
        `;
      }
    } catch (error) {
      throw new Error(`Erreur lors de la génération du contenu de l'email QCM : ${error.message}`);
    }
  }

  async generateEntretienEmailContent(candidatId, entretienDetails) {
    try {
      // Récupérer le template de mail pour entretien
      const template = await CorpsMailsModel.getByType('entretien');
      
      if (template) {
        // Remplacer les variables dans le template
        let content = template.contenu;
        content = content.replace(/\{candidat_id\}/g, candidatId);
        content = content.replace(/\{date_entretien\}/g, entretienDetails.date || 'À déterminer');
        content = content.replace(/\{lieu_entretien\}/g, entretienDetails.lieu || 'À déterminer');
        
        return content;
      } else {
        // Template par défaut
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Invitation à un entretien</h2>
            <p>Bonjour,</p>
            <p>Nous avons le plaisir de vous inviter à un entretien dans le cadre de votre candidature.</p>
            <p><strong>Date :</strong> ${entretienDetails.date || 'À déterminer'}</p>
            <p><strong>Lieu :</strong> ${entretienDetails.lieu || 'À déterminer'}</p>
            <p>Merci de confirmer votre présence.</p>
            <p>Cordialement,<br>L'équipe RH</p>
          </div>
        `;
      }
    } catch (error) {
      throw new Error(`Erreur lors de la génération du contenu de l'email d'entretien : ${error.message}`);
    }
  }

  async logEmail(to, subject, content, status, error = null) {
    try {
      const emailLog = {
        destinataire: to,
        sujet: subject,
        contenu: content,
        statut: status,
        date_envoi: new Date(),
        erreur: error
      };
      
      await MailsModel.create(emailLog);
    } catch (logError) {
      console.error('Erreur lors de l\'enregistrement du log email :', logError);
    }
  }

  async getEmailHistory() {
    try {
      return await MailsModel.getAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'historique des emails : ${error.message}`);
    }
  }

  async getEmailsByCandidate(candidatId) {
    try {
      return await MailsModel.getByCandidatId(candidatId);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des emails du candidat : ${error.message}`);
    }
  }
}

module.exports = new EmailService();