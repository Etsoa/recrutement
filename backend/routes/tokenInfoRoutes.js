const express = require('express');
const router = express.Router();
const envoiQcmService = require('../services/envoiQcmService');
const reponseQcmService = require('../services/reponseQcmService');

/**
 * Route pour récupérer les informations d'un QCM déjà complété
 * Utilisé pour afficher des informations sur la page "Token Déjà Utilisé"
 */
router.post('/qcm/token-info', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token manquant',
        data: null
      });
    }

    // Vérifier le token et récupérer les informations
    const tokenInfo = await envoiQcmService.verifyTokenQcm(token);
    
    if (tokenInfo.error) {
      let statusCode = 400;
      
      switch (tokenInfo.error) {
        case 'TOKEN_EXPIRED':
          statusCode = 410; // Gone
          break;
        case 'TOKEN_ALREADY_USED':
          statusCode = 409; // Conflict
          break;
        case 'TOKEN_NOT_FOUND':
        case 'CANDIDAT_NOT_FOUND':
          statusCode = 404; // Not Found
          break;
        case 'TOKEN_INVALID':
          statusCode = 400; // Bad Request
          break;
      }
      
      return res.status(statusCode).json({
        success: false,
        message: tokenInfo.message,
        data: null,
        error_code: tokenInfo.error
      });
    }

    // Si le token est déjà utilisé, récupérer les statistiques du QCM
    const qcmCompleted = await reponseQcmService.isQcmCompleted(tokenInfo.id_envoi_qcm_candidat);
    
    if (qcmCompleted) {
      // Récupérer les statistiques du QCM complété
      const stats = await reponseQcmService.calculateQcmStats(tokenInfo.id_envoi_qcm_candidat, tokenInfo.id_annonce);
      
      return res.json({
        success: true,
        message: 'Informations du QCM complété récupérées',
        data: {
          candidat: {
            nom: tokenInfo.nom,
            prenom: tokenInfo.prenom,
            poste: tokenInfo.poste
          },
          qcm_info: {
            date_completion: stats.date_completion,
            score_sur_20: stats.score_sur_20,
            pourcentage: stats.pourcentage,
            nombre_questions: stats.nombre_questions,
            duree_totale: stats.duree_totale,
            debut_qcm: stats.debut_qcm,
            fin_qcm: stats.fin_qcm
          },
          status: 'COMPLETED'
        }
      });
    }

    // Le token est valide mais le QCM n'est pas encore complété (ne devrait pas arriver)
    return res.json({
      success: true,
      message: 'Token valide, QCM non complété',
      data: {
        candidat: {
          nom: tokenInfo.nom,
          prenom: tokenInfo.prenom,
          poste: tokenInfo.poste
        },
        status: 'VALID'
      }
    });

  } catch (error) {
    console.error('Erreur récupération infos token:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des informations',
      data: null
    });
  }
});

module.exports = router;