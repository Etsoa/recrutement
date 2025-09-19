// testData/annoncesTestData.js - Données de test pour les annonces
// Ce fichier peut être utilisé pour centraliser et organiser les données de test

export const createTestAnnonce = ({
  id,
  poste,
  ville,
  ageMin,
  ageMax,
  genre = "Indifférent",
  experiences = [],
  langues = [],
  qualites = [],
  formations = []
}) => ({
  id_annonce: id,
  age_min: ageMin,
  age_max: ageMax,
  Poste: { valeur: poste },
  Ville: { valeur: ville },
  Genre: { valeur: genre },
  ExperienceAnnonces: experiences.map(exp => ({
    nombre_annee: exp.duree,
    Domaine: { valeur: exp.domaine }
  })),
  LangueAnnonces: langues.map(langue => ({
    Langue: { valeur: langue }
  })),
  QualiteAnnonces: qualites.map(qualite => ({
    Qualite: { valeur: qualite }
  })),
  NiveauFiliereAnnonces: formations.map(formation => ({
    Filiere: { valeur: formation.filiere },
    Niveau: { valeur: formation.niveau }
  }))
});

// Exemples d'utilisation du helper :
export const annoncesDeveloppeur = createTestAnnonce({
  id: 1,
  poste: "Développeur Full-Stack",
  ville: "Antananarivo", 
  ageMin: 25,
  ageMax: 35,
  experiences: [
    { domaine: "Développement web", duree: 3 },
    { domaine: "Base de données", duree: 2 }
  ],
  langues: ["Français", "Anglais", "JavaScript"],
  qualites: ["Autonome", "Créatif", "Rigoureux"],
  formations: [
    { filiere: "Informatique", niveau: "Licence" }
  ]
});

// Fonction pour générer des annonces aléatoirement
export const generateRandomAnnonces = (count = 10) => {
  const postes = ["Développeur", "Designer", "Marketing Manager", "Comptable", "RH", "Commercial"];
  const villes = ["Antananarivo", "Fianarantsoa", "Toamasina", "Mahajanga", "Antsirabe"];
  const langues = ["Français", "Anglais", "Malagasy", "JavaScript", "Python"];
  const qualites = ["Autonome", "Créatif", "Rigoureux", "Communicatif", "Organisé", "Leadership"];
  
  return Array.from({ length: count }, (_, i) => 
    createTestAnnonce({
      id: i + 1,
      poste: postes[Math.floor(Math.random() * postes.length)],
      ville: villes[Math.floor(Math.random() * villes.length)],
      ageMin: 22 + Math.floor(Math.random() * 5),
      ageMax: 30 + Math.floor(Math.random() * 15),
      experiences: [
        { 
          domaine: "Expérience générale", 
          duree: 1 + Math.floor(Math.random() * 5) 
        }
      ],
      langues: langues.slice(0, 2 + Math.floor(Math.random() * 3)),
      qualites: qualites.slice(0, 2 + Math.floor(Math.random() * 4)),
      formations: [
        { 
          filiere: "Formation générale", 
          niveau: Math.random() > 0.5 ? "Licence" : "Master" 
        }
      ]
    })
  );
};