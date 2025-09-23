// ===== SERVICES IMPORTS =====
const viewCandidatsService = require('../services/unite/viewCandidatsService');
const viewCandidatsDetailsService = require('../services/unite/candidatsDetailsService');

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
