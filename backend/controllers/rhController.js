const rhService = require('../services/rhService');
const annonceService = require('../services/annoncesService');

exports.getAllRhs = async (req, res) => {
  try {
    const data = await rhService.getAllRhs(); // à remplacer par la vraie récupération depuis la DB
    res.json({ message: 'Liste des RH récupérée avec succès', data, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des RH', data: null, success: false });
  }
};

exports.loginRh = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ou mot de passe manquant', data: null, success: false });
  }

  try {
    const rh = await rhService.loginRh(email, password);
    if (rh) {
      res.json({ message: 'Connexion réussie', data: { rh, token: 'fake-jwt-token' }, success: true });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect', data: null, success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', data: null, success: false });
  }
};

exports.getAllSuggests = async (req, res) => {
  try {
    const suggestions = await rhService.getAllSuggests();
    res.json({ message: 'Suggestions récupérées', data: suggestions, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', data: null, success: false });
  }
};

exports.createAnnonce = async (req, res) => {
  try {
    const { id_poste, id_ville, age_min, age_max, id_genre } = req.query;

    if (!id_poste || !id_ville || !id_genre) {
      return res.status(400).json({ message: 'Données manquantes', data: null, success: false });
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

exports.createRhEntretien = async (req, res) => {
  try {
    const entretien = await rhService.createRhEntretien(req.body);
    res.status(201).json({ message: 'Entretien RH créé avec succès', data: entretien, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de l’entretien RH", data: null, success: false });
  }
};

exports.getAllRhEntretiensParJour = async (req, res) => {
  try {
    const { day } = req.query; // format 'YYYY-MM-DD'
    if (!day) {
      return res.status(400).json({ message: 'Jour manquant', data: null, success: false });
    }

    const entretiens = await rhService.getEntretiensParJour(day);
    res.json({ message: 'Entretiens récupérés', data: entretiens, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', data: null, success: false });
  }
};

exports.updateDateRhEntretien = async (req, res) => {
  try {
    const { id_rh_entretien, nouvelle_date } = req.body;

    if (!id_rh_entretien || !nouvelle_date) {
      return res.status(400).json({ message: 'id_rh_entretien ou nouvelle_date manquant', data: null, success: false });
    }

    const entretien = await rhService.updateDateRhEntretien(id_rh_entretien, nouvelle_date);

    if (!entretien) {
      return res.status(404).json({ message: 'Entretien non trouvé', data: null, success: false });
    }

    res.json({ message: 'Date de l’entretien mise à jour avec succès', data: entretien, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur: ' + err.message, data: null, success: false });
  }
};

exports.getRhById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID manquant', data: null, success: false });

    const data = await rhService.getRhById(id); // à remplacer par la vraie récupération depuis DB

    if (!data) return res.status(404).json({ message: 'RH non trouvé', data: null, success: false });

    res.json({ message: 'RH récupéré avec succès', data, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération du RH', data: null, success: false });
  }
};

exports.updateStatusRhEntretien = async (req, res) => {
  try {
    const { id_rh_entretien, id_type_status_entretien } = req.body;

    if (!id_rh_entretien || !id_type_status_entretien) {
      return res.status(400).json({
        message: 'id_rh_entretien ou id_type_status_entretien manquant',
        data: null,
        success: false
      });
    }

    // Appelle le service
    const status = await rhService.updateStatusRhEntretien(id_rh_entretien, id_type_status_entretien);

    if (!status) {
      return res.status(404).json({
        message: 'Entretien RH non trouvé',
        data: null,
        success: false
      });
    }

    res.json({
      message: 'Statut de l’entretien RH mis à jour avec succès',
      data: status,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur: ' + err.message, data: null, success: false });
  }
};

exports.getDisponibilitesRh = async (req, res) => {
  try {
    const { id_rh, date } = req.body; // date au format 'YYYY-MM-DD'
    if (!id_rh || !date) {
      return res.status(400).json({ message: 'ID RH ou date manquante', success: false });
    }

    const disponibilites = await rhService.getDisponibilitesRh(id_rh, date);

    res.json({
      message: 'Disponibilités récupérées',
      data: disponibilites,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

exports.reserveEntretienRh = async (req, res) => {
  try {
    const { id_rh_entretien, date_entretien, id_type_status_entretien } = req.body;
    if (!id_rh_entretien || !date_entretien || !id_type_status_entretien) {
      return res.status(400).json({ message: 'Données manquantes', success: false });
    }

    // Mettre à jour la date
    const entretien = await rhService.updateDateRhEntretien(id_rh_entretien, date_entretien);

    // Mettre à jour le statut
    const status = await rhService.updateStatusRhEntretien(id_rh_entretien, id_type_status_entretien);

    res.json({
      message: 'Entretien mis à jour avec succès',
      data: { entretien, status },
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, success: false });
  }
};
