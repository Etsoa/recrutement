const ceoService = require('../services/ceoService');
const contratService = require('../services/contratEssaisService');
const ContratEssai = require('../models/contratEssaisModel');

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

  // Vérification des champs obligatoires
  if (!email) {
    return res.status(400).json({
      message: 'Email manquant',
      data: null,
      success: false
    });
  }

  if (!mot_de_passe) {
    return res.status(400).json({
      message: 'Mot de passe manquant',
      data: null,
      success: false
    });
  }

  try {
    const ceo = await ceoService.loginCeo(email, mot_de_passe);

    if (!ceo) {
      return res.status(401).json({
        message: `Nom ou mot de passe incorrect, 
                  ou bien vous n'êtes plus un CEO actif dans l'entreprise`,
        data: null,
        success: false
      });
    }

    return res.json({
      message: 'Connexion réussie',
      data: { ceo, token: 'fake-jwt-token' },
      success: true
    });

  } catch (err) {
    return res.status(500).json({
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
    const id_ceo_suggestion = req.body.id_ceo_suggestion ?? req.body.id_suggestion;

    if (!id_ceo_suggestion) {
      return res.status(400).json({
        success: false,
        message: "id_ceo_suggestion est requis",
        data: null
      });
    }

    const result = await ceoService.refuserSuggestion(id_ceo_suggestion);

    if (!result?.success) {
      return res.status(400).json({
        success: false,
        message: result?.message || "Erreur lors du refus de la suggestion",
        data: null
      });
    }

    return res.json({
      success: true,
      message: result.message || "Suggestion refusée avec succès",
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
    const id_ceo_suggestion = req.body.id_ceo_suggestion ?? req.body.id_suggestion;
    const { date_debut, duree, id_poste, id_tiers } = req.body;

    if (!id_ceo_suggestion) {
      return res.status(400).json({
        success: false,
        message: "id_ceo_suggestion est requis",
        data: null
      });
    }

    const result = await ceoService.accepterSuggestion(
      id_ceo_suggestion,
      date_debut,
      duree,
      id_poste,
      id_tiers
    );

    if (!result?.success) {
      return res.status(400).json({
        success: false,
        message: result?.message || "Erreur lors de la validation de la suggestion",
        data: null
      });
    }

    return res.json({
      success: true,
      message: result.message || "Suggestion acceptée avec succès",
      data: result.data ?? null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'acceptation de la suggestion",
      data: null
    });
  }
}

exports.getEmpEnContratDEssai = async (req, res) => {
  try {
    const emp = await ceoService.getEmpEnContratDEssai();
    res.json({
      message: `Liste des employés en contrat d'essai récupérée avec succès`,
      data: emp,
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

exports.renewContract = async (req, res) => {
  try {
    const { id_contrat, duree_mois } = req.body;

    if (!id_contrat) {
      return res.status(400).json({ success: false, message: 'id_contrat est requis', data: null });
    }

    const current = await ContratEssai.findByPk(id_contrat);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Contrat introuvable', data: null });
    }

    const id_employe = current.id_employe;
    const allForEmp = await ContratEssai.findAll({ where: { id_employe } });
    const totalContracts = allForEmp.length; // initial + renewals

    // Max 2 contrats au total: si déjà 2, on bloque
    if (totalContracts >= 2) {
      return res.status(400).json({ success: false, message: 'Limite de contrats d\'essai atteinte (2 maximum)', data: null });
    }

    // Trouver le dernier contrat pour positionner le nouveau juste après sa fin
    const last = allForEmp.reduce((acc, c) => {
      if (!acc) return c; const ad = new Date(acc.date_debut); const cd = new Date(c.date_debut); return cd > ad ? c : acc;
    }, null);

    let start = new Date();
    if (last) {
      const lastStart = new Date(last.date_debut);
      const next = new Date(lastStart);
      next.setMonth(lastStart.getMonth() + last.duree); // positionné à la fin du dernier
      next.setDate(next.getDate() + 1); // démarrer le renouvellement le lendemain
      start = next;
    }

    const toYMD = (d) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    const newContrat = await contratService.createContratEssai({
      id_employe,
      date_debut: toYMD(start),
      duree: duree_mois || current.duree
    });

    return res.json({
      success: true,
      message: 'Contrat renouvelé avec succès',
      data: { contrat: { ...newContrat.toJSON?.() || newContrat, is_renewal: true } }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      data: null,
      success: false
    });
  }
}
