const traitementAnnonceService = require('../services/unite/traitementAnnoncesService');

exports.getAllAnnonces = async (req, res) => {
  try {
    const data = await traitementAnnonceService.getAllAnnonces();
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

const { getAnnonceById } = require('../services/unite/traitementAnnoncesService');

exports.getAnnonceById = async (req, res) => {
  try {
    const id = req.params.id; // ID depuis l'URL
    const data = await getAnnonceById(id);
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



// exports.loginUnite = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (username === 'admin' && password === '1234') {
//       res.json({ message: 'Connexion réussie', data: { token: 'fake-jwt-token' }, success: true });
//     } else {
//       res.status(401).json({ message: 'Nom ou mot de passe incorrect', data: null, success: false });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur serveur lors de la connexion', data: null, success: false });
//   }
// };


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

