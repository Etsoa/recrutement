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

// Fonction pour calculer le pourcentage de correspondance candidat/annonce
async function calculerCorrespondanceCandidat(id_annonce, candidatData) {
  try {
    // Récupérer les exigences de l'annonce
  const annonce = await Annonce.findOne({
      where: { id_annonce },
      include: [
        { model: Poste },
        { model: Ville },
        { model: Genre },
        {
          model: NiveauFiliereAnnonce,
          include: [
            { model: Filiere },
            { model: Niveau }
          ]
        },
        {
          model: LangueAnnonce,
          include: [ { model: Langue } ]
        },
        {
          model: QualiteAnnonce,
          include: [ { model: Qualite } ]
        },
        {
          model: ExperienceAnnonce,
          include: [ { model: Domaine } ]
        }
      ]
    });
    
    if (!annonce) return 0;

    let score = 0;
    let criteres_total = 0;

    // 1. Vérification de l'âge (20% du score)
    criteres_total += 20;
    if (annonce.age_min && annonce.age_max) {
      if (candidatData.age >= annonce.age_min && candidatData.age <= annonce.age_max) {
        score += 20;
      }
    } else {
      // Si pas de critère d'âge, donner les points
      score += 20;
    }

    // 2. Vérification du genre (10% du score)
    criteres_total += 10;
    if (!annonce.id_genre || annonce.id_genre === candidatData.id_genre) {
      score += 10;
    }

    // 3. Vérification de la ville (10% du score)
    criteres_total += 10;
    if (annonce.id_ville === candidatData.id_ville) {
      score += 10;
    }

    // 4. Vérification des formations (25% du score)
    criteres_total += 25;
    if (annonce.NiveauFiliereAnnonces && annonce.NiveauFiliereAnnonces.length > 0 && candidatData.formations) {
      const formationsRequises = annonce.NiveauFiliereAnnonces;
      const formationsCandidats = candidatData.formations;
      
      let formations_match = 0;
      formationsRequises.forEach(formationReq => {
        const match = formationsCandidats.find(formationCand => 
          formationCand.id_filiere === formationReq.id_filiere && 
          formationCand.id_niveau === formationReq.id_niveau
        );
        if (match) formations_match++;
      });
      
      score += Math.round((formations_match / formationsRequises.length) * 25);
    } else if (!annonce.NiveauFiliereAnnonces || annonce.NiveauFiliereAnnonces.length === 0) {
      score += 25; // Pas d'exigence = points accordés
    }

    // 5. Vérification des langues (15% du score)
    criteres_total += 15;
    if (annonce.LangueAnnonces && annonce.LangueAnnonces.length > 0 && candidatData.langues) {
      const languesRequises = annonce.LangueAnnonces;
      const languesCandidats = candidatData.langues;
      
      let langues_match = 0;
      languesRequises.forEach(langueReq => {
        const match = languesCandidats.find(langueCand => 
          langueCand.id_langue === langueReq.id_langue
        );
        if (match) langues_match++;
      });
      
      score += Math.round((langues_match / languesRequises.length) * 15);
    } else if (!annonce.LangueAnnonces || annonce.LangueAnnonces.length === 0) {
      score += 15;
    }

    // 6. Vérification des qualités (10% du score)
    criteres_total += 10;
    if (annonce.QualiteAnnonces && annonce.QualiteAnnonces.length > 0 && candidatData.qualites) {
      const qualitesRequises = annonce.QualiteAnnonces;
      const qualitesCandidats = candidatData.qualites;
      
      let qualites_match = 0;
      qualitesRequises.forEach(qualiteReq => {
        const match = qualitesCandidats.find(qualiteCand => 
          qualiteCand.id_qualite === qualiteReq.id_qualite
        );
        if (match) qualites_match++;
      });
      
      score += Math.round((qualites_match / qualitesRequises.length) * 10);
    } else if (!annonce.QualiteAnnonces || annonce.QualiteAnnonces.length === 0) {
      score += 10;
    }

    // 7. Vérification des expériences (10% du score)
    criteres_total += 10;
    if (annonce.ExperienceAnnonces && annonce.ExperienceAnnonces.length > 0 && candidatData.experiences) {
      const experiencesRequises = annonce.ExperienceAnnonces;
      const experiencesCandidats = candidatData.experiences;
      
      let experiences_match = 0;
      experiencesRequises.forEach(expReq => {
        const match = experiencesCandidats.find(expCand => 
          expCand.id_domaine === expReq.id_domaine && 
          expCand.duree >= expReq.nombre_annee
        );
        if (match) experiences_match++;
      });
      
      score += Math.round((experiences_match / experiencesRequises.length) * 10);
    } else if (!annonce.ExperienceAnnonces || annonce.ExperienceAnnonces.length === 0) {
      score += 10;
    }

    // Calculer le pourcentage final
    const pourcentage = Math.min(100, Math.max(0, Math.round((score / criteres_total) * 100)));
    
    console.log(`Calcul correspondance: ${score}/${criteres_total} = ${pourcentage}%`);
    
    return pourcentage;

  } catch (error) {
    console.error('Erreur calcul correspondance:', error);
    return 50; // Score par défaut en cas d'erreur
  }
}

async function evaluerCandidatCV(candidatData, id_annonce) {
  try {
    const age = calculerAge(candidatData.date_naissance);
    
    const pourcentage = await calculerCorrespondanceCandidat(id_annonce, {
      formations: candidatData.formations || [],
      langues: candidatData.langues || [],
      qualites: candidatData.qualites || [],
      experiences: candidatData.experiences || [],
      age,
      id_genre: candidatData.id_genre,
      id_ville: candidatData.id_ville
    });

    return {
      pourcentage,
      age,
      details: {
        formations_fournies: candidatData.formations ? candidatData.formations.length : 0,
        langues_fournies: candidatData.langues ? candidatData.langues.length : 0,
        qualites_fournies: candidatData.qualites ? candidatData.qualites.length : 0,
        experiences_fournies: candidatData.experiences ? candidatData.experiences.length : 0
      }
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