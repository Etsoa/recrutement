import React, { useState, useEffect, useCallback } from "react";
import AnnonceCard from "../components/AnnonceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { annoncesService } from "../services/annoncesService";
import "../styles/AnnoncesPage.css";

function Annonces() {
  // ===== CONFIGURATION =====
  const USE_TEST_DATA = true;
  
  // États pour le carousel
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Données de test selon la structure de la base de données
  const donneesTest = [
    {
      id_annonce: 1,
      age_min: 25,
      age_max: 35,
      Poste: { valeur: "Développeur Full-Stack" },
      Ville: { valeur: "Antananarivo" },
      Genre: { valeur: "Indifférent" },
      ExperienceAnnonces: [
        {
          nombre_annee: 3,
          Domaine: { valeur: "Développement web" }
        },
        {
          nombre_annee: 2,
          Domaine: { valeur: "Base de données" }
        }
      ],
      LangueAnnonces: [
        { Langue: { valeur: "Français" } },
        { Langue: { valeur: "Anglais" } },
        { Langue: { valeur: "JavaScript" } }
      ],
      QualiteAnnonces: [
        { Qualite: { valeur: "Autonome" } },
        { Qualite: { valeur: "Créatif" } },
        { Qualite: { valeur: "Rigoureux" } }
      ],
      NiveauFiliereAnnonces: [
        {
          Filiere: { valeur: "Informatique" },
          Niveau: { valeur: "Licence" }
        }
      ]
    },
    {
      id_annonce: 2,
      age_min: 28,
      age_max: 40,
      Poste: { valeur: "Chef de Projet Digital" },
      Ville: { valeur: "Antananarivo" },
      Genre: { valeur: "Indifférent" },
      ExperienceAnnonces: [
        {
          nombre_annee: 5,
          Domaine: { valeur: "Gestion de projet" }
        },
        {
          nombre_annee: 3,
          Domaine: { valeur: "Marketing digital" }
        }
      ],
      LangueAnnonces: [
        { Langue: { valeur: "Français" } },
        { Langue: { valeur: "Anglais" } }
      ],
      QualiteAnnonces: [
        { Qualite: { valeur: "Leadership" } },
        { Qualite: { valeur: "Communicatif" } },
        { Qualite: { valeur: "Organisé" } }
      ],
      NiveauFiliereAnnonces: [
        {
          Filiere: { valeur: "Marketing" },
          Niveau: { valeur: "Master" }
        }
      ]
    },
    {
      id_annonce: 3,
      age_min: 23,
      age_max: 32,
      Poste: { valeur: "Designer UX/UI" },
      Ville: { valeur: "Antananarivo" },
      Genre: { valeur: "Indifférent" },
      ExperienceAnnonces: [
        {
          nombre_annee: 2,
          Domaine: { valeur: "Design graphique" }
        },
        {
          nombre_annee: 1,
          Domaine: { valeur: "Interface utilisateur" }
        }
      ],
      LangueAnnonces: [
        { Langue: { valeur: "Français" } },
        { Langue: { valeur: "Anglais" } }
      ],
      QualiteAnnonces: [
        { Qualite: { valeur: "Créatif" } },
        { Qualite: { valeur: "Minutieux" } },
        { Qualite: { valeur: "Innovant" } }
      ],
      NiveauFiliereAnnonces: [
        {
          Filiere: { valeur: "Design" },
          Niveau: { valeur: "Licence" }
        }
      ]
    },
    {
      id_annonce: 4,
      age_min: 26,
      age_max: 38,
      Poste: { valeur: "Ingénieur DevOps" },
      Ville: { valeur: "Toamasina" },
      Genre: { valeur: "Indifférent" },
      ExperienceAnnonces: [
        {
          nombre_annee: 4,
          Domaine: { valeur: "Administration système" }
        },
        {
          nombre_annee: 3,
          Domaine: { valeur: "Cloud computing" }
        }
      ],
      LangueAnnonces: [
        { Langue: { valeur: "Français" } },
        { Langue: { valeur: "Anglais" } }
      ],
      QualiteAnnonces: [
        { Qualite: { valeur: "Rigoureux" } },
        { Qualite: { valeur: "Analytique" } },
        { Qualite: { valeur: "Proactif" } }
      ],
      NiveauFiliereAnnonces: [
        {
          Filiere: { valeur: "Informatique" },
          Niveau: { valeur: "Master" }
        }
      ]
    },
    {
      id_annonce: 5,
      age_min: 24,
      age_max: 35,
      Poste: { valeur: "Data Analyst" },
      Ville: { valeur: "Antananarivo" },
      Genre: { valeur: "Indifférent" },
      ExperienceAnnonces: [
        {
          nombre_annee: 3,
          Domaine: { valeur: "Analyse de données" }
        },
        {
          nombre_annee: 2,
          Domaine: { valeur: "Statistiques" }
        }
      ],
      LangueAnnonces: [
        { Langue: { valeur: "Français" } },
        { Langue: { valeur: "Anglais" } },
        { Langue: { valeur: "Python" } },
        { Langue: { valeur: "SQL" } }
      ],
      QualiteAnnonces: [
        { Qualite: { valeur: "Analytique" } },
        { Qualite: { valeur: "Méthodique" } },
        { Qualite: { valeur: "Curieux" } }
      ],
      NiveauFiliereAnnonces: [
        {
          Filiere: { valeur: "Mathématiques" },
          Niveau: { valeur: "Master" }
        }
      ]
    }
  ];

  const loadAnnonces = useCallback(async () => {
    setLoading(true);
    setError("");
    
    try {
      if (USE_TEST_DATA) {
        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnnonces(donneesTest);
      } else {
        const response = await annoncesService.getAllAnnonces();
        if (response.success && response.data) {
          setAnnonces(response.data);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement');
        }
      }
    } catch (err) {
      console.error('Erreur chargement annonces:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [USE_TEST_DATA]); // Retiré donneesTest de la dépendance

  useEffect(() => {
    loadAnnonces();
  }, [loadAnnonces]);

  // Navigation carousel - une annonce par slide
  const totalSlides = annonces.length;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  if (loading) {
    return (
      <div className="annonces-page">
        <LoadingSpinner message="Chargement des offres d'emploi..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="annonces-page">
        <ErrorMessage
          title="Erreur de chargement"
          message={error}
          onRetry={loadAnnonces}
        />
      </div>
    );
  }

  return (
    <div className="annonces-page">
      <div className="annonces-container">
        <div className="page-header">
          <h1>Offres d'Emploi</h1>
          <p className="page-subtitle">
            {annonces.length} poste{annonces.length > 1 ? 's' : ''} à pourvoir
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-wrapper">
            <button 
              className="carousel-btn carousel-btn-prev"
              onClick={prevSlide}
              disabled={totalSlides <= 1}
            >
              ‹
            </button>

            <div className="carousel-content">
              <div 
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {annonces.map((annonce, index) => (
                  <div key={index} className="carousel-slide">
                    <AnnonceCard
                      annonce={annonce}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="carousel-btn carousel-btn-next"
              onClick={nextSlide}
              disabled={totalSlides <= 1}
            >
              ›
            </button>
          </div>

          {totalSlides > 1 && (
            <div className="carousel-indicators">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Annonces;