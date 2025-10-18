const Annonce = require('../models/annoncesModel');
const Poste = require('../models/postesModel');
const Ville = require('../models/villesModel');
const Genre = require('../models/genresModel');
const NiveauFiliereAnnonce = require('../models/niveauFiliereAnnoncesModel');
const Filiere = require('../models/filieresModel');
const Niveau = require('../models/niveauxModel');
const LangueAnnonce = require('../models/langueAnnoncesModel');
const Langue = require('../models/languesModel');
const QualiteAnnonce = require('../models/qualiteAnnoncesModel');
const Qualite = require('../models/qualitesModel');
const ExperienceAnnonce = require('../models/experienceAnnoncesModel');
const Domaine = require('../models/domainesModel');

// Fonction pour calculer l'âge
function calculerAge(dateNaissance) {
  const aujourd_hui = new Date();
  const naissance = new Date(dateNaissance);
  let age = aujourd_hui.getFullYear() - naissance.getFullYear();
  const mois = aujourd_hui.getMonth() - naissance.getMonth();
  
  if (mois < 0 || (mois === 0 && aujourd_hui.getDate() < naissance.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Calculer la correspondance détaillée entre un candidat et une annonce
 * @param {number} id_annonce - ID de l'annonce
 * @param {object} candidatData - Données du candidat (formations, langues, qualités, expériences, age, id_genre, id_ville)
 * @returns {object} - { pourcentage, score, criteres_total, details }
 */
async function calculerCorrespondanceCandidat(id_annonce, candidatData) {
  try {
    // Récupérer les exigences de l'annonce
    const annonce = await Annonce.findOne({
      where: { id_annonce },
      include: [
        { model: Poste, as: 'Poste', attributes: ['id_poste', 'valeur'] },
        { model: Ville, as: 'Ville', attributes: ['id_ville', 'valeur'] },
        { model: Genre, as: 'Genre', attributes: ['id_genre', 'valeur'] },
        {
          model: NiveauFiliereAnnonce,
          as: 'niveauFiliereAnnonces',
          include: [
            { model: Filiere, attributes: ['id_filiere', 'valeur'] },
            { model: Niveau, attributes: ['id_niveau', 'valeur'] }
          ]
        },
        {
          model: LangueAnnonce,
          as: 'Langues',
          include: [{ model: Langue, as: 'Langue', attributes: ['id_langue', 'valeur'] }]
        },
        {
          model: QualiteAnnonce,
          as: 'Qualites',
          include: [{ model: Qualite, as: 'Qualite', attributes: ['id_qualite', 'valeur'] }]
        },
        {
          model: ExperienceAnnonce,
          as: 'Experiences',
          include: [{ model: Domaine, as: 'Domaine', attributes: ['id_domaine', 'valeur'] }]
        }
      ]
    });
    
    if (!annonce) {
      return {
        pourcentage: 0,
        score: 0,
        criteres_total: 100,
        details: {
          age: { requis: null, candidat: null, match: false, score: 0, maxScore: 20 },
          genre: { requis: null, candidat: null, match: false, score: 0, maxScore: 10 },
          ville: { requis: null, candidat: null, match: false, score: 0, maxScore: 10 },
          formations: { requis: [], candidat: [], matches: [], score: 0, maxScore: 25 },
          langues: { requis: [], candidat: [], matches: [], score: 0, maxScore: 15 },
          qualites: { requis: [], candidat: [], matches: [], score: 0, maxScore: 10 },
          experiences: { requis: [], candidat: [], matches: [], score: 0, maxScore: 10 }
        }
      };
    }

    let score = 0;
    let criteres_total = 0;
    const details = {};

    // 1. Vérification de l'âge (20% du score)
    criteres_total += 20;
    let ageScore = 0;
    let ageMatch = false;
    
    if (annonce.age_min && annonce.age_max) {
      if (candidatData.age >= annonce.age_min && candidatData.age <= annonce.age_max) {
        ageScore = 20;
        ageMatch = true;
      }
    } else {
      // Si pas de critère d'âge, donner les points
      ageScore = 20;
      ageMatch = true;
    }
    score += ageScore;
    
    details.age = {
      requis: annonce.age_min && annonce.age_max ? `${annonce.age_min}-${annonce.age_max} ans` : 'Non spécifié',
      candidat: candidatData.age ? `${candidatData.age} ans` : 'Non spécifié',
      match: ageMatch,
      score: ageScore,
      maxScore: 20
    };

    // 2. Vérification du genre (10% du score)
    criteres_total += 10;
    let genreScore = 0;
    let genreMatch = false;
    
    if (!annonce.id_genre || annonce.id_genre === candidatData.id_genre) {
      genreScore = 10;
      genreMatch = true;
    }
    score += genreScore;
    
    details.genre = {
      requis: annonce.Genre ? annonce.Genre.valeur : 'Non spécifié',
      candidat: candidatData.genre_valeur || 'Non spécifié',
      match: genreMatch,
      score: genreScore,
      maxScore: 10
    };

    // 3. Vérification de la ville (10% du score)
    criteres_total += 10;
    let villeScore = 0;
    let villeMatch = false;
    
    if (annonce.id_ville === candidatData.id_ville) {
      villeScore = 10;
      villeMatch = true;
    }
    score += villeScore;
    
    details.ville = {
      requis: annonce.Ville ? annonce.Ville.valeur : 'Non spécifié',
      candidat: candidatData.ville_valeur || 'Non spécifié',
      match: villeMatch,
      score: villeScore,
      maxScore: 10
    };

    // 4. Vérification des formations (25% du score)
    criteres_total += 25;
    let formationsScore = 0;
    const formationsMatches = [];
    
    if (annonce.niveauFiliereAnnonces && annonce.niveauFiliereAnnonces.length > 0 && candidatData.formations) {
      const formationsRequises = annonce.niveauFiliereAnnonces;
      const formationsCandidats = candidatData.formations;
      
      let formations_match = 0;
      formationsRequises.forEach(formationReq => {
        const match = formationsCandidats.find(formationCand => 
          formationCand.id_filiere === formationReq.id_filiere && 
          formationCand.id_niveau === formationReq.id_niveau
        );
        if (match) {
          formations_match++;
          formationsMatches.push({
            filiere: formationReq.Filiere ? formationReq.Filiere.valeur : 'N/A',
            niveau: formationReq.Niveau ? formationReq.Niveau.valeur : 'N/A'
          });
        }
      });
      
      formationsScore = Math.round((formations_match / formationsRequises.length) * 25);
    } else if (!annonce.niveauFiliereAnnonces || annonce.niveauFiliereAnnonces.length === 0) {
      formationsScore = 25; // Pas d'exigence = points accordés
    }
    score += formationsScore;
    
    details.formations = {
      requis: annonce.niveauFiliereAnnonces ? annonce.niveauFiliereAnnonces.map(f => ({
        filiere: f.Filiere ? f.Filiere.valeur : 'N/A',
        niveau: f.Niveau ? f.Niveau.valeur : 'N/A'
      })) : [],
      candidat: candidatData.formations || [],
      matches: formationsMatches,
      score: formationsScore,
      maxScore: 25
    };

    // 5. Vérification des langues (15% du score)
    criteres_total += 15;
    let languesScore = 0;
    const languesMatches = [];
    
    if (annonce.Langues && annonce.Langues.length > 0 && candidatData.langues) {
      const languesRequises = annonce.Langues;
      const languesCandidats = candidatData.langues;
      
      let langues_match = 0;
      languesRequises.forEach(langueReq => {
        const match = languesCandidats.find(langueCand => 
          langueCand.id_langue === langueReq.id_langue
        );
        if (match) {
          langues_match++;
          languesMatches.push(langueReq.Langue ? langueReq.Langue.valeur : 'N/A');
        }
      });
      
      languesScore = Math.round((langues_match / languesRequises.length) * 15);
    } else if (!annonce.Langues || annonce.Langues.length === 0) {
      languesScore = 15;
    }
    score += languesScore;
    
    details.langues = {
      requis: annonce.Langues ? annonce.Langues.map(l => l.Langue ? l.Langue.valeur : 'N/A') : [],
      candidat: candidatData.langues ? candidatData.langues.map(l => l.valeur || 'N/A') : [],
      matches: languesMatches,
      score: languesScore,
      maxScore: 15
    };

    // 6. Vérification des qualités (10% du score)
    criteres_total += 10;
    let qualitesScore = 0;
    const qualitesMatches = [];
    
    if (annonce.Qualites && annonce.Qualites.length > 0 && candidatData.qualites) {
      const qualitesRequises = annonce.Qualites;
      const qualitesCandidats = candidatData.qualites;
      
      let qualites_match = 0;
      qualitesRequises.forEach(qualiteReq => {
        const match = qualitesCandidats.find(qualiteCand => 
          qualiteCand.id_qualite === qualiteReq.id_qualite
        );
        if (match) {
          qualites_match++;
          qualitesMatches.push(qualiteReq.Qualite ? qualiteReq.Qualite.valeur : 'N/A');
        }
      });
      
      qualitesScore = Math.round((qualites_match / qualitesRequises.length) * 10);
    } else if (!annonce.Qualites || annonce.Qualites.length === 0) {
      qualitesScore = 10;
    }
    score += qualitesScore;
    
    details.qualites = {
      requis: annonce.Qualites ? annonce.Qualites.map(q => q.Qualite ? q.Qualite.valeur : 'N/A') : [],
      candidat: candidatData.qualites ? candidatData.qualites.map(q => q.valeur || 'N/A') : [],
      matches: qualitesMatches,
      score: qualitesScore,
      maxScore: 10
    };

    // 7. Vérification des expériences (10% du score)
    criteres_total += 10;
    let experiencesScore = 0;
    const experiencesMatches = [];
    
    if (annonce.Experiences && annonce.Experiences.length > 0 && candidatData.experiences) {
      const experiencesRequises = annonce.Experiences;
      const experiencesCandidats = candidatData.experiences;
      
      let experiences_match = 0;
      experiencesRequises.forEach(expReq => {
        const match = experiencesCandidats.find(expCand => 
          expCand.id_domaine === expReq.id_domaine && 
          expCand.duree >= expReq.nombre_annee
        );
        if (match) {
          experiences_match++;
          experiencesMatches.push({
            domaine: expReq.Domaine ? expReq.Domaine.valeur : 'N/A',
            duree_requise: expReq.nombre_annee,
            duree_candidat: match.duree
          });
        }
      });
      
      experiencesScore = Math.round((experiences_match / experiencesRequises.length) * 10);
    } else if (!annonce.Experiences || annonce.Experiences.length === 0) {
      experiencesScore = 10;
    }
    score += experiencesScore;
    
    details.experiences = {
      requis: annonce.Experiences ? annonce.Experiences.map(e => ({
        domaine: e.Domaine ? e.Domaine.valeur : 'N/A',
        duree: e.nombre_annee
      })) : [],
      candidat: candidatData.experiences || [],
      matches: experiencesMatches,
      score: experiencesScore,
      maxScore: 10
    };

    // Calculer le pourcentage final
    const pourcentage = Math.min(100, Math.max(0, Math.round((score / criteres_total) * 100)));
    
    console.log(`Calcul correspondance: ${score}/${criteres_total} = ${pourcentage}%`);
    
    return {
      pourcentage,
      score,
      criteres_total,
      details
    };

  } catch (error) {
    console.error('Erreur calcul correspondance:', error);
    return {
      pourcentage: 0,
      score: 0,
      criteres_total: 100,
      details: {},
      error: error.message
    };
  }
}

/**
 * Évaluer un candidat par rapport à une annonce
 */
async function evaluerCandidatCV(candidatData, id_annonce) {
  try {
    const age = calculerAge(candidatData.date_naissance);
    
    const evaluation = await calculerCorrespondanceCandidat(id_annonce, {
      formations: candidatData.formations || [],
      langues: candidatData.langues || [],
      qualites: candidatData.qualites || [],
      experiences: candidatData.experiences || [],
      age,
      id_genre: candidatData.id_genre,
      id_ville: candidatData.id_ville,
      genre_valeur: candidatData.genre_valeur,
      ville_valeur: candidatData.ville_valeur
    });

    return {
      pourcentage: evaluation.pourcentage,
      age,
      details: evaluation.details,
      score: evaluation.score,
      criteres_total: evaluation.criteres_total
    };
  } catch (error) {
    console.error('Erreur evaluerCandidatCV:', error);
    throw error;
  }
}

module.exports = {
  calculerCorrespondanceCandidat,
  evaluerCandidatCV,
  calculerAge
};
