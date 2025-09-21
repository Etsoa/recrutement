const traitementAnnonceService = require('../services/unite/traitementAnnoncesService');
const traitementDossierService = require('../services/unite/traitementDossierService');
const nodemailer = require('nodemailer');


exports.getAllAnnonces = async (req, res) => {
  try {
    const id = req.data.id;
    const data = await traitementAnnonceService.getAllAnnonces(id);
    res.json({ 
      message: 'Liste des annonces récupérée avec succès',
      data: data,
      success: true
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des annonces',
      data: null,
      success: false
    });
  }
};


exports.getAnnonceById = async (req, res) => {
  try {
    const id = req.params.id; // ID depuis l'URL
    const data = await traitementAnnonceService.getAnnonceById(id);
    if (!data) {
      return res.status(404).json({
        message: 'Annonce non trouvée',
        data: null,
        success: false
      });
    }
    res.json({
      message: 'Annonce récupérée avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la récupération de l\'annonce',
      data: null,
      success: false
    });
  }
};

exports.getCandidatById = async (req, res) => {
  try {
    const id = req.params.id; 
    const data = await traitementAnnonceService.getCandidatById(id);
    if (!data) {
      return res.status(404).json({
        message: 'Candidat non trouvé',
        data: null,
        success: false
      });
    }
    res.json({
      message: 'Candidat récupéré avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la récupération du candidat',
      data: null,
      success: false
    });
  }
};

exports.sendQcmCandidat = async (req, res) => {
  try {
    const id = req.data.id;
    const data = await traitementDossierService.sendQcmCandidat(id);
    res.status(201).json({
      message: 'QCM candidat envoyé avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la récupération du candidat',
      data: null,
      success: false
    });
  }
};

exports.sendUniteEntretien = async (req, res) => {
  try {
    const id = req.data.id;
    const data = await traitementDossierService.sendUniteEntretien(id);
    res.status(201).json({
      message: 'Unité d\'entretien envoyée avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la récupération du candidat',
      data: null,
      success: false
    });
  }
};



// exports.getAnnonceById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const annonce = await annoncesService.getAnnonceCompleteById(id);
    
//     if (!annonce) {
//       return res.status(404).json({
//         message: 'Annonce non trouvée',
//         data: null,
//         success: false
//       });
//     }
    
//     res.json({ 
//       message: 'Annonce récupérée avec succès', 
//       data: annonce, 
//       success: true 
//     });
//   } catch (err) {
//     console.error('Erreur getAnnonceById:', err);
//     res.status(500).json({ 
//       message: 'Erreur lors de la récupération de l\'annonce', 
//       data: null, 
//       success: false 
//     });
//   }
// };

