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
  try {
    const suggestions = await ceoService.getAllSuggests();

    res.json({
      message: 'Liste des suggestions CEO récupérée avec succès',
      data: suggestions,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des suggestions',
      data: null,
      success: false
    });
  }
}

exports.getAllEmployes = async (req, res) => {
  try {
    const employes = await ceoService.getAllEmployes();

    res.json({
      message: 'Liste des employés pour CEO récupérée avec succès',
      data: employes,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des employés',
      data: null,
      success: false
    });
  }
}

exports.getAllSuggestsWaitingValidation = async (req, res) => {
  try {
    const suggestions = await ceoService.getAllSuggestsWaitingValidation();

    res.json({
      message: 'Liste des suggestions en attente pour CEO récupérée avec succès',
      data: suggestions,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des suggestions',
      data: null,
      success: false
    });
  }
}

exports.refuserSuggestion = async (req, res) => {
  try {
    const { id_ceo_suggestion } = req.body;

    if (!id_ceo_suggestion) {
      return res.status(400).json({
        success: false,
        message: "id_ceo_suggestion est requis",
        data: null
      });
    }

    ceoService.refuserSuggestion(id_ceo_suggestion);

    return res.json({
      success: true,
      message: "Suggestion refusée avec succès",
      data: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors du refus de la suggestion",
      data: null
    });
  }
};

exports.accepterSuggestion = async (req, res) => {
  try {
    const {
      id_ceo_suggestion,
      id_employe,
      date_debut,
      duree,
      id_poste,
      id_tiers } = req.body;

    if (!id_ceo_suggestion) {
      return res.status(400).json({
        success: false,
        message: "id_ceo_suggestion est requis",
        data: null
      });
    }

    ceoService.accepterSuggestion(
      id_ceo_suggestion, 
      id_employe, 
      date_debut, 
      duree, 
      id_poste, 
      id_tiers);

    return res.json({
      success: true,
      message: "Suggestion accepte avec succès",
      data: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors du refus de la suggestion",
      data: null
    });
  }
}
