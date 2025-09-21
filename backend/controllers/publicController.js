exports.qcmQuestions = async (req, res) => {
  try {
    res.json({ message: "Questions QCM envoyées !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

exports.qcmReponses = async (req, res) => {
  try {
    res.json({ message: "Réponses QCM reçues !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

exports.getAllPublics = async (req, res) => {
  try {
    const data = []; // récupérer depuis la base
    res.json({ message: 'Liste des Public récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des Public', data: null, success: false });
  }
};

exports.loginPublic = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
      res.json({ message: 'Connexion réussie', data: { token: 'fake-jwt-token' }, success: true });
    } else {
      res.status(401).json({ message: 'Nom ou mot de passe incorrect', data: null, success: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de la connexion', data: null, success: false });
  }
};

exports.getPublicById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { id, name: 'Exemple Public' }; // récupérer depuis la base
    res.json({ message: 'Public récupéré avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du Public', data: null, success: false });
  }
};
