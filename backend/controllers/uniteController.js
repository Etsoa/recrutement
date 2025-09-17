const Service = require('../services/unitesService');

exports.getAllUnites = async (req, res) => {
  try {
    const data = await Service.getAllUnites();
    res.json({ message: 'Liste des unités récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des unités', data: null, success: false });
  }
};

exports.loginUnite = async (req, res) => {
  try {
    const { username, password } = req.body;

    const unite = await Service.getUniteByCredentials(username, password);

    if (unite) {
      res.json({
        message: 'Connexion réussie',
        data: { token: 'fake-jwt-token', unite },
        success: true
      });
    } else {
      res.status(401).json({
        message: 'Nom ou mot de passe incorrect',
        data: null,
        success: false
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur serveur lors de la connexion',
      data: null,
      success: false
    });
  }
};

exports.getUniteById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Service.getUniteById(id);
    res.json({ message: 'Unité récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l’unité', data: null, success: false });
  }
};
