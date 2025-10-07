// ===== SERVICES IMPORTS =====
const viewCandidatsService = require('../services/unite/viewCandidatsService');
const viewCandidatsDetailsService = require('../services/unite/candidatsDetailsService');
const rhCandidatsStatsService = require('../services/rh/candidatsStatsService');

// ===== CONTROLLERS =====
exports.getAllStats = async (req, res) => {
  try {
    const { age1 = 1, age2 = 100, langue = 2 } = req.body;
    
    // Vérification des paramètres d'âge
    if (age1 < 0 || age2 < 0 || age1 > age2) {
      return res.status(400).json({
        message: 'Paramètres d\'âge invalides',
        data: null,
        success: false
      });
    }
    
    // Récupération des statistiques avec gestion des erreurs
    let age_min = await viewCandidatsService.getAgeMin();
    let age_max = await viewCandidatsService.getAgeMax();
    let age_moyen = await viewCandidatsService.getAgeMoyen();
    const byVilles = await viewCandidatsService.countByVille();
    const byGenre = await viewCandidatsService.countByGenre();
    const byAgeRange = await viewCandidatsService.countByAgeTranche(age1, age2);
    const byLangues = await viewCandidatsDetailsService.countByLangues();
    const byN = await viewCandidatsDetailsService.countByNiveau();
    const byE = await viewCandidatsDetailsService.countByExperience();
    
    // Contrôle des données vides avec valeurs par défaut
    age_min = (age_min !== null && age_min !== undefined) ? age_min : 0;
    age_max = (age_max !== null && age_max !== undefined) ? age_max : 0;
    age_moyen = (age_moyen !== null && age_moyen !== undefined) ? Math.round(age_moyen * 100) / 100 : 0;
    
    // Vérification de la cohérence des données
    const hasData = (byVilles && byVilles.length > 0) || 
                    (byGenre && byGenre.length > 0) || 
                    age_min > 0 || age_max > 0;
                    
    const data = {
      age_min,
      age_max,
      age_moyen,
      byVilles: Array.isArray(byVilles) ? byVilles : [],
      byGenre: Array.isArray(byGenre) ? byGenre : [],
      byLangue: byLangues || {},
      byNiveau: Array.isArray(byN) ? byN : [],
      byExperience: Array.isArray(byE) ? byE : [],
      byAgeRange: byAgeRange || 0,
      hasData: hasData,
      totalCandidats: (byGenre && Array.isArray(byGenre)) ? byGenre.reduce((sum, g) => sum + (g.total || 0), 0) : 0
    };
    
    res.json({
      message: hasData ? 'Statistiques récupérées avec succès' : 'Aucune donnée de candidature disponible',
      data,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getAllStats:", err.message, err.stack);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques',
      error: err.message,
      data: {
        age_min: 0,
        age_max: 0,
        age_moyen: 0,
        byVilles: [],
        byGenre: [],
        byLangue: {},
        byNiveau: [],
        byExperience: [],
        byAgeRange: 0,
        hasData: false,
        totalCandidats: 0
      },
      success: false
    });
  }
};

// ===== NOUVELLE FONCTION POUR STATISTIQUES PAR UNITE =====
exports.getStatsByUnite = async (req, res) => {
  try {
    const { id_unite, age1 = 1, age2 = 100 } = req.body;
    
    // Validation des paramètres
    if (!id_unite || isNaN(id_unite)) {
      return res.status(400).json({
        message: 'ID de l\'unité requis et doit être un nombre valide',
        data: null,
        success: false
      });
    }
    
    if (age1 < 0 || age2 < 0 || age1 > age2) {
      return res.status(400).json({
        message: 'Paramètres d\'âge invalides',
        data: null,
        success: false
      });
    }

    // Récupération des statistiques pour cette unité avec gestion d'erreurs
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
    
    // Candidats par nombre de langues (vérification de l'existence de la fonction)
    const byLangues = await viewCandidatsDetailsService.countByLanguesByUnite ? 
                     await viewCandidatsDetailsService.countByLanguesByUnite(id_unite) : {};
    
    // Candidats par niveau d'études
    const byNiveau = await viewCandidatsDetailsService.countByNiveauByUnite ?
                     await viewCandidatsDetailsService.countByNiveauByUnite(id_unite) : [];
    
    // Candidats par expérience
    const byExperience = await viewCandidatsDetailsService.countByExperienceByUnite ?
                         await viewCandidatsDetailsService.countByExperienceByUnite(id_unite) : [];

    // Contrôle des données vides avec valeurs par défaut sécurisées
    age_min = (age_min !== null && age_min !== undefined && !isNaN(age_min)) ? age_min : 0;
    age_max = (age_max !== null && age_max !== undefined && !isNaN(age_max)) ? age_max : 0;
    age_moyen = (age_moyen !== null && age_moyen !== undefined && !isNaN(age_moyen)) ? Math.round(age_moyen * 100) / 100 : 0;
    
    // Vérification de l'existence de données
    const hasData = totalCandidatures > 0 || 
                    (Array.isArray(byVilles) && byVilles.length > 0) ||
                    (Array.isArray(byGenre) && byGenre.length > 0) ||
                    (Array.isArray(ageRanges) && ageRanges.length > 0);

    const data = {
      totalCandidatures: totalCandidatures || 0,
      age_min,
      age_max,
      age_moyen,
      byAgeRange: byAgeRange || 0,
      ageRanges: Array.isArray(ageRanges) ? ageRanges : [],
      byVilles: Array.isArray(byVilles) ? byVilles : [],
      byGenre: Array.isArray(byGenre) ? byGenre : [],
      byLangues: byLangues && typeof byLangues === 'object' ? byLangues : {},
      byNiveau: Array.isArray(byNiveau) ? byNiveau : [],
      byExperience: Array.isArray(byExperience) ? byExperience : [],
      hasData: hasData,
      uniteId: id_unite
    };

    res.json({
      message: hasData ? 'Statistiques par unité récupérées avec succès' : 'Aucune donnée de candidature disponible pour cette unité',
      data,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getStatsByUnite:", err.message, err.stack);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques par unité',
      error: err.message,
      data: {
        totalCandidatures: 0,
        age_min: 0,
        age_max: 0,
        age_moyen: 0,
        byAgeRange: 0,
        ageRanges: [],
        byVilles: [],
        byGenre: [],
        byLangues: {},
        byNiveau: [],
        byExperience: [],
        hasData: false,
        uniteId: id_unite
      },
      success: false
    });
  }
};

// ===== NOUVELLE FONCTION POUR STATISTIQUES RH GENERALES =====
exports.getRhStats = async (req, res) => {
  try {
    const { age1 = 1, age2 = 100 } = req.body;
    
    // Validation des paramètres d'âge
    if (age1 < 0 || age2 < 0 || age1 > age2) {
      return res.status(400).json({
        message: 'Paramètres d\'âge invalides',
        data: null,
        success: false
      });
    }

    // Récupération de toutes les statistiques RH générales
    const stats = await rhCandidatsStatsService.getAllRhStats({ age1, age2 });
    
    // Contrôle des données vides
    const hasData = stats && (
      stats.totalCandidatures > 0 ||
      (Array.isArray(stats.tranchesAge) && stats.tranchesAge.length > 0) ||
      (Array.isArray(stats.villes) && stats.villes.length > 0) ||
      (Array.isArray(stats.genres) && stats.genres.length > 0)
    );
    
    // Sécurisation des données
    const secureStats = {
      totalCandidatures: stats?.totalCandidatures || 0,
      ageMin: (stats?.ageMin !== null && stats?.ageMin !== undefined) ? stats.ageMin : 0,
      ageMax: (stats?.ageMax !== null && stats?.ageMax !== undefined) ? stats.ageMax : 0,
      ageMoyen: (stats?.ageMoyen !== null && stats?.ageMoyen !== undefined && !isNaN(stats.ageMoyen)) ? Math.round(stats.ageMoyen * 100) / 100 : 0,
      tranchesAge: Array.isArray(stats?.tranchesAge) ? stats.tranchesAge : [],
      villes: Array.isArray(stats?.villes) ? stats.villes : [],
      genres: Array.isArray(stats?.genres) ? stats.genres : [],
      langues: Array.isArray(stats?.langues) ? stats.langues : [],
      education: Array.isArray(stats?.education) ? stats.education : [],
      experience: Array.isArray(stats?.experience) ? stats.experience : [],
      hasData: hasData
    };

    res.json({
      message: hasData ? 'Statistiques RH générales récupérées avec succès' : 'Aucune donnée de candidature disponible',
      data: secureStats,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getRhStats:", err.message, err.stack);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques RH',
      error: err.message,
      data: {
        totalCandidatures: 0,
        ageMin: 0,
        ageMax: 0,
        ageMoyen: 0,
        tranchesAge: [],
        villes: [],
        genres: [],
        langues: [],
        education: [],
        experience: [],
        hasData: false
      },
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
