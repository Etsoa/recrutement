import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import AnnonceCard from '../components/AnnonceCard';
import StepIndicator from '../components/candidature/StepIndicator';
import PersonalInfoStep from '../components/candidature/PersonalInfoStep';
import ProfessionalInfoStep from '../components/candidature/ProfessionalInfoStep';
import SummaryStep from '../components/candidature/SummaryStep';
import '../styles/CandidaturePage.css';

const CandidaturePage = () => {
  const { annonceId } = useParams();
  const navigate = useNavigate();
  
  // État pour l'étape courante
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // États pour l'annonce
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // États du formulaire global
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    date_naissance: '',
    genre: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    situation_matrimoniale: '',
    nombre_enfants: '',
    
    // Formation
    formations: [],
    
    // Expériences
    experiences: [],
    
    // Langues
    langues: [],
    
    // Qualités
    qualites: [],
    
    // Fichiers
    photo: null,
    cv: null
  });
  
  // État pour les erreurs de validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les données de l'annonce
  useEffect(() => {
    const loadAnnonce = async () => {
      try {
        setLoading(true);
        
        // TODO: Remplacer par un appel API réel
        // const response = await fetch(`/api/annonces/${annonceId}`);
        // const annonceData = await response.json();
        
        // Pour l'instant, utilisation de données test avec l'ID de l'annonce
        const mockAnnonce = {
          id_annonce: annonceId,
          Poste: { valeur: `Développeur Full Stack` },
          Ville: { valeur: "Antananarivo" },
          Genre: { valeur: "Tous genres" },
          age_min: 25,
          age_max: 35,
          ExperienceAnnonces: [
            {
              nombre_annee: 3,
              Domaine: { valeur: "Développement Web" }
            },
            {
              nombre_annee: 2,
              Domaine: { valeur: "Base de données" }
            }
          ],
          LangueAnnonces: [
            { Langue: { valeur: "Français" } },
            { Langue: { valeur: "Anglais" } },
            { Langue: { valeur: "Malagasy" } }
          ],
          QualiteAnnonces: [
            { Qualite: { valeur: "Autonome" } },
            { Qualite: { valeur: "Rigoureux" } },
            { Qualite: { valeur: "Créatif" } }
          ],
          NiveauFiliereAnnonces: [
            {
              Niveau: { valeur: "Licence" },
              Filiere: { valeur: "Informatique" }
            }
          ],
          date_publication: new Date().toISOString().split('T')[0],
          date_limite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
        
        setAnnonce(mockAnnonce);
      } catch (err) {
        setError('Erreur lors du chargement de l\'annonce');
        console.error('Erreur de chargement de l\'annonce:', err);
      } finally {
        setLoading(false);
      }
    };

    if (annonceId) {
      loadAnnonce();
    } else {
      setError('ID d\'annonce manquant');
      setLoading(false);
    }
  }, [annonceId]);

  // Mettre à jour les données du formulaire
  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Nettoyer les erreurs des champs modifiés
    if (errors) {
      const newErrors = { ...errors };
      Object.keys(newData).forEach(key => {
        if (newErrors[key]) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  // Validation par étape
  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Informations personnelles
        if (!formData.nom?.trim()) newErrors.nom = 'Le nom est requis';
        if (!formData.prenom?.trim()) newErrors.prenom = 'Le prénom est requis';
        if (!formData.date_naissance) newErrors.date_naissance = 'La date de naissance est requise';
        if (!formData.genre) newErrors.genre = 'Le genre est requis';
        if (!formData.email?.trim()) newErrors.email = 'L\'email est requis';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Format d\'email invalide';
        }
        if (!formData.telephone?.trim()) newErrors.telephone = 'Le téléphone est requis';
        if (!formData.adresse?.trim()) newErrors.adresse = 'L\'adresse est requise';
        if (!formData.ville) newErrors.ville = 'La ville est requise';
        // Vérification des formations
        if (!formData.formations || formData.formations.length === 0) {
          newErrors.formations = 'Au moins une formation est requise';
        } else {
          // Vérifier que chaque formation a une filière et au moins un niveau
          formData.formations.forEach((formation, index) => {
            if (!formation.filiere) {
              newErrors[`formation_${index}_filiere`] = `La filière de la formation ${index + 1} est requise`;
            }
            if (!formation.niveaux || formation.niveaux.length === 0) {
              newErrors[`formation_${index}_niveaux`] = `Au moins un niveau pour la formation ${index + 1} est requis`;
            }
          });
        }
        break;
        
      case 2: // Informations professionnelles
        // Au moins une expérience avec poste et entreprise
        if (!formData.experiences || formData.experiences.length === 0) {
          newErrors.experiences = 'Au moins une expérience professionnelle est requise';
        } else {
          // Vérifier que chaque expérience a les champs requis
          formData.experiences.forEach((exp, index) => {
            if (!exp.poste?.trim()) {
              newErrors[`experience_${index}_poste`] = `Le poste de l'expérience ${index + 1} est requis`;
            }
            if (!exp.entreprise?.trim()) {
              newErrors[`experience_${index}_entreprise`] = `L'entreprise de l'expérience ${index + 1} est requise`;
            }
            if (!exp.date_debut) {
              newErrors[`experience_${index}_date_debut`] = `La date de début de l'expérience ${index + 1} est requise`;
            }
          });
        }
        // CV requis
        if (!formData.cv) {
          newErrors.cv = 'Le CV est requis';
        }
        break;
        
      case 3: // Récapitulatif (validation finale)
        // Réexécuter toutes les validations
        return validateStep(1) && validateStep(2);
      default:
        // Cas par défaut pour les étapes non reconnues
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation entre les étapes
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Préparer les données pour l'envoi
      const submissionData = new FormData();
      
      // Ajouter toutes les données du formulaire
      Object.keys(formData).forEach(key => {
        if (key === 'experiences' || key === 'langues' || key === 'qualites') {
          submissionData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== '') {
          submissionData.append(key, formData[key]);
        }
      });
      
      submissionData.append('annonce_id', annonceId);

      // Simulation de l'envoi (à remplacer par un appel API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Succès
      alert('Candidature envoyée avec succès !');
      navigate('/annonces');
      
    } catch (err) {
      alert('Erreur lors de l\'envoi de la candidature');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendu du composant d'étape actuel
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <ProfessionalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <SummaryStep
            formData={formData}
            annonceData={annonce}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="candidature-page">
        <LoadingSpinner message="Chargement de l'annonce..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="candidature-page">
        <ErrorMessage
          title="Erreur de chargement"
          message={error}
          onBack={() => navigate('/annonces')}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="candidature-page">
      <div className="candidature-container">
        {/* Grand titre */}
        <div className="main-title">
          <h1>POSTULER POUR CE POSTE</h1>
        </div>

        {/* Aperçu de l'annonce en haut */}
        <div className="annonce-preview-section">
          {annonce && (
            <AnnonceCard 
              annonce={annonce}
              hideActions={true}
            />
          )}
        </div>

        {/* Step Indicator en bas du preview */}
        <div className="step-indicator-section">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Formulaire en bas */}
        <div className="form-section">
          {/* Contenu de l'étape courante */}
          <div className="step-container">
            {renderCurrentStep()}
          </div>

          {/* Navigation */}
          <div className="step-navigation">
            <div className="nav-buttons">
              {currentStep > 1 && (
                <Button 
                  onClick={goToPreviousStep}
                  variant="secondary"
                  disabled={isSubmitting}
                >
                  ← Précédent
                </Button>
              )}
              
              <div className="nav-spacer"></div>
              
              {currentStep < totalSteps ? (
                <Button 
                  onClick={goToNextStep}
                  variant="primary"
                  disabled={isSubmitting}
                >
                  Suivant →
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </Button>
              )}
            </div>
          </div>
          
          {/* Indicateurs de progression */}
          <div className="progress-info">
            {currentStep === totalSteps && (
              <div className="final-check">
                <p className="info">✓ Vérifiez toutes vos informations avant d'envoyer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidaturePage;