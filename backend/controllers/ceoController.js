const ceoService = require('../services/ceoService');

// Mbola tsy mandeha
exports.getAllCeos = async (req, res) => {
  try {
    const data = []; // récupérer depuis la base
    res
      .json({
        message: 'Liste des CEO récupérée avec succès',
        data,
        success: true
      });
  } catch (err) {
    res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération des CEO',
        data: null,
        success: false
      });
  }
};

// Mbola tsy mandeha
exports.getCeoById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { id, name: 'Exemple CEO' }; // récupérer depuis la base
    res
      .json({
        message: 'CEO récupéré avec succès',
        data,
        success: true
      });
  } catch (err) {
    res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération du CEO',
        data: null,
        success: false
      });
  }
};

exports.loginCeo = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400)
      .json({
        message: 'Email ou mot de passe manquant',
        data: null,
        success: false
      });
  }

  try {
    const ceo = await ceoService.loginCeo(email, mot_de_passe);

    if (ceo) {
      res
        .json({
          message: 'Connexion réussie',
          data: { ceo, token: 'fake-jwt-token' },
          success: true
        });
    } else {
      res
        .status(401)
        .json({
          message: `Nom ou mot de passe incorrect, 
          ou bien vous n'êtes plus un CEO actif dans l'entreprise`,
          data: null,
          success: false
        });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        message: 'Erreur serveur lors de la connexion',
        data: null,
        success: false
      });
  }
};

exports.getAllSuggests = async (req, res) => {
  
}