exports.getAllRhs = async (req, res) => {
  try {
    const data = []; // récupérer depuis la base
    res.json({ message: 'Liste des RH récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des RH', data: null, success: false });
  }
};

exports.loginRh = async (req, res) => {
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

exports.getRhById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { id, name: 'Exemple RH' }; // récupérer depuis la base
    res.json({ message: 'RH récupéré avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du RH', data: null, success: false });
  }
};
