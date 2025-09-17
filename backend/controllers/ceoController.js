exports.getAllCeos = async (req, res) => {
  try {
    const data = []; // récupérer depuis la base
    res.json({ message: 'Liste des CEO récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des CEO', data: null, success: false });
  }
};

exports.loginCeo = async (req, res) => {
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

exports.getCeoById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { id, name: 'Exemple CEO' }; // récupérer depuis la base
    res.json({ message: 'CEO récupéré avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du CEO', data: null, success: false });
  }
};
