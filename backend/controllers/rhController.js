const rhService = require('../services/rhService');
const annonceService = require('../services/annoncesService');

exports.getAllRhs = async (req, res) => {
  try {
    const data = []; // récupérer depuis la base
    res.json({ message: 'Liste des RH récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des RH', data: null, success: false });
  }
};

exports.loginRh = async (req, res) => {
    const { email, password } = req.body;

    try {
        const rh = await rhService.loginRh(email, password);
        if (rh) {
            res.json({ message: 'Connexion réussie', data: { rh, token: 'fake-jwt-token' }, success: true });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect', data: null, success: false });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', data: null, success: false });
    }
};

exports.getAllSuggests = async (req, res) => {
  try {
    const suggestions = await rhService.getAllSuggests();
    res.json({ message: 'Suggestions récupérées', data: suggestions, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', data: null, success: false });
  }
};

exports.createAnnonce = async (req, res) => {
  try {
    const { id_poste, id_ville, age_min, age_max, id_genre } = req.query;

    if (!id_poste || !id_ville || !id_genre) {
      return res.status(400).json({ message: 'Données manquantes', success: false });
    }

    const newAnnonce = await annonceService.createAnnonce({
      id_poste,
      id_ville,
      age_min: age_min || null,
      age_max: age_max || null,
      id_genre
    });

    res.json({ message: 'Annonce créée', data: newAnnonce, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', data: null, success: false });
  }
};

exports.getRhById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { id, name: 'Exemple RH' }; // récupérer depuis la base
    res.json({ message: 'RH récupéré avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du RH', data: null, success: false });
  }
};
