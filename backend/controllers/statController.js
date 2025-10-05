// ===== SERVICES IMPORTS =====
const viewCandidatsService = require('../services/unite/viewCandidatsService');
const viewCandidatsDetailsService = require('../services/unite/candidatsDetailsService');
const rhCandidatsStatsService = require('../services/rh/candidatsStatsService');

// ===== CONTROLLERS =====
exports.getAllStats = async (req, res) => {
  try {
    const { age1 = 1, age2 = 100, langue = 2 } = req.body;
    // age1 = 1;
    // age2 = 100;
    // langue = 2;
    let age_min = await viewCandidatsService.getAgeMin();
    let age_max = await viewCandidatsService.getAgeMax();
    let age_moyen = await viewCandidatsService.getAgeMoyen();
    const byVilles = await viewCandidatsService.countByVille();
    const byGenre = await viewCandidatsService.countByGenre();
    const byAgeRange = await viewCandidatsService.countByAgeTranche(age1, age2);
     const byLangues = await viewCandidatsDetailsService.countByLangues();
    const byN = await viewCandidatsDetailsService.countByNiveau();
    const byE = await viewCandidatsDetailsService.countByExperience();
    age_min = age_min ?? 0;
    age_max = age_max ?? 0;
    age_moyen = age_moyen ?? 0;
    const data = {
      age_min,
      age_max,
      age_moyen,
      byVilles: byVilles || [],
      byGenre: byGenre || [],
      byLangue: byLangues || [],
      byNiveau: byN || [],
      byExperience: byE || []
    };
    res.json({
      message: 'Statistique récupérée avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getAllStats:", err.message, err.stack);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques',
      error: err.message,
      data: null,
      success: false
    });
  }
};

// ===== NOUVELLE FONCTION POUR STATISTIQUES PAR UNITE =====
exports.getStatsByUnite = async (req, res) => {
  try {
    const { id_unite, age1 = 1, age2 = 100 } = req.body;
    
    if (!id_unite) {
      return res.status(400).json({
        message: 'ID de l\'unité requis',
        data: null,
        success: false
      });
    }

    // Récupération des statistiques pour cette unité
    const totalCandidatures = await viewCandidatsService.countCandidaturesByUnite(id_unite);
    let age_min = await viewCandidatsService.getAgeMinByUnite(id_unite);
    let age_max = await viewCandidatsService.getAgeMaxByUnite(id_unite);
    let age_moyen = await viewCandidatsService.getAgeMoyenByUnite(id_unite);
    
    // Candidats par tranches d'âge 
    const byAgeRange = await viewCandidatsService.countByAgeTranche(age1, age2, id_unite);
    const ageRanges = await viewCandidatsService.countByAgeRanges(id_unite);
    
    // Candidats par ville
    const byVilles = await viewCandidatsService.countByVilleByUnite(id_unite);
    
    // Candidats par genre
    const byGenre = await viewCandidatsService.countByGenreByUnite(id_unite);
    
    // Candidats par nombre de langues
    const byLangues = await viewCandidatsDetailsService.countByLanguesByUnite(id_unite);
    
    // Candidats par niveau d'études
    const byNiveau = await viewCandidatsDetailsService.countByNiveauByUnite(id_unite);
    
    // Candidats par expérience
    const byExperience = await viewCandidatsDetailsService.countByExperienceByUnite(id_unite);

    age_min = age_min ?? 0;
    age_max = age_max ?? 0;
    age_moyen = age_moyen ?? 0;

    const data = {
      totalCandidatures,
      age_min,
      age_max,
      age_moyen,
      byAgeRange,
      ageRanges: ageRanges || [],
      byVilles: byVilles || [],
      byGenre: byGenre || [],
      byLangues: byLangues || {},
      byNiveau: byNiveau || [],
      byExperience: byExperience || []
    };

    res.json({
      message: 'Statistiques par unité récupérées avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getStatsByUnite:", err.message, err.stack);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques par unité',
      error: err.message,
      data: null,
      success: false
    });
  }
};

// ===== NOUVELLE FONCTION POUR STATISTIQUES RH GENERALES =====
exports.getRhStats = async (req, res) => {
  try {
    const { age1 = 1, age2 = 100 } = req.body;

    // Récupération de toutes les statistiques RH générales
    const stats = await rhCandidatsStatsService.getAllRhStats({ age1, age2 });

    res.json({
      message: 'Statistiques RH générales récupérées avec succès',
      data: stats,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getRhStats:", err.message, err.stack);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques RH',
      error: err.message,
      data: null,
      success: false
    });
  }
};


// ===== CONTROLLERS =====
exports.getAllStats2 = async (req, res) => {
  try {
    let age_min = await viewCandidatsService.getAgeMin();
    let age_max = await viewCandidatsService.getAgeMax();
    let age_moyen = await viewCandidatsService.getAgeMoyen();
    const byVilles = await viewCandidatsService.countByVille();
    const byGenre = await viewCandidatsService.countByGenre();
    const byLangues = await viewCandidatsDetailsService.countByLangues();
    const byN = await viewCandidatsDetailsService.countByNiveau();
    const byE = await viewCandidatsDetailsService.countByExperience();
    age_min = age_min ?? 0;
    age_max = age_max ?? 0;
    age_moyen = age_moyen ?? 0;
    const data = {
      age_min,
      age_max,
      age_moyen,
      byVilles: byVilles || [],
      byGenre: byGenre || [],
      byLangue: byLangues || [],
      byNiveau: byN || [],
      byExperience: byE || []
    };
    res.json({
      message: 'Statistique récupérée avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getAllStats:", err.message, err.stack);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques',
      error: err.message,
      data: null,
      success: false
    });
  }
};
