import React, { useEffect } from 'react';
import CV from '../CV';
import '../../styles/CandidatureStep.css';

const SummaryStep = ({ formData, annonceData, errors = {} }) => {
  // Fonction utilitaire pour formater les formations pour le CV
  const formatFormationsForCV = () => {
    let formations = [];
    
    // Formations universitaires (priorité)
    if (formData.formationsUniversitaires && formData.formationsUniversitaires.length > 0) {
      const formation = formData.formationsUniversitaires[0]; // Prendre la première
      const niveauxTexte = formation.niveaux ? formation.niveaux.join(', ') : '';
      formations.push({
        niveau: niveauxTexte,
        filiere: formation.filiere,
        etablissement: formation.etablissement || '',
        annee: formation.annee || ''
      });
    } 
    // Si pas de formation universitaire, utiliser les formations pré-universitaires
    else if (formData.formationsPreUniversitaires) {
      if (formData.formationsPreUniversitaires.bacs && formData.formationsPreUniversitaires.bacs.length > 0) {
        const bac = formData.formationsPreUniversitaires.bacs[0];
        formations.push({
          niveau: 'BAC',
          filiere: `Série ${bac.serie}`,
          etablissement: bac.etablissement || '',
          annee: bac.annee || ''
        });
      } else if (formData.formationsPreUniversitaires.bepc) {
        formations.push({
          niveau: 'BEPC',
          filiere: '',
          etablissement: '',
          annee: ''
        });
      }
    }
    
    return formations[0] || { niveau: '', filiere: '', etablissement: '', annee: '' };
  };

  // Fonction utilitaire pour formater les expériences pour le CV
  const formatExperiencesForCV = () => {
    if (!formData.experiences || formData.experiences.length === 0) return [];
    
    return formData.experiences.map(exp => ({
      poste: exp.intitule_poste || '', // Mapper intitule_poste vers poste
      entreprise: exp.nom_entreprise || '', // Mapper nom_entreprise vers entreprise
      dateDebut: exp.date_debut ? new Date(exp.date_debut).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '',
      dateFin: exp.date_fin ? new Date(exp.date_fin).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'En cours',
      description: exp.description_taches || '' // Mapper description_taches vers description
    }));
  };

  // Fonction utilitaire pour formater les langues pour le CV
  const formatLanguesForCV = () => {
    if (!formData.langues || formData.langues.length === 0) return [];
    
    return formData.langues.map(langueItem => {
      // Si c'est un objet avec une propriété 'langue', extraire la valeur
      if (typeof langueItem === 'object' && langueItem.langue) {
        return langueItem.langue;
      }
      // Si c'est déjà une string, la retourner telle quelle
      return langueItem;
    });
  };

  // Fonction utilitaire pour formater les qualités pour le CV
  const formatQualitesForCV = () => {
    if (!formData.qualites || formData.qualites.length === 0) return [];
    
    return formData.qualites.map(qualiteItem => {
      // Si c'est un objet avec une propriété 'qualite', extraire la valeur
      if (typeof qualiteItem === 'object' && qualiteItem.qualite) {
        return qualiteItem.qualite;
      }
      // Si c'est déjà une string, la retourner telle quelle
      return qualiteItem;
    });
  };

  // Fonction utilitaire pour formater la photo pour le CV
  const formatPhotoForCV = () => {
    if (!formData.photo) return null;
    
    // Si c'est un objet File, créer une URL
    if (formData.photo instanceof File) {
      return URL.createObjectURL(formData.photo);
    }
    
    // Si c'est déjà une URL string, la retourner
    if (typeof formData.photo === 'string') {
      return formData.photo;
    }
    
    return null;
  };

  // Fonction utilitaire pour résoudre la situation matrimoniale
  const resolveSituationMatrimoniale = () => {
    const situationValue = formData.situation_matrimoniale;
    
    if (!situationValue) return '';
    
    // Si c'est déjà une string simple, la retourner
    if (typeof situationValue === 'string') {
      return situationValue;
    }
    
    // Si c'est un objet avec une propriété value ou label
    if (typeof situationValue === 'object') {
      return situationValue.value || situationValue.label || situationValue.valeur || '';
    }
    
    return '';
  };

  // Mapper les données du formulaire vers les props du CV
  const cvProps = {
    // Informations personnelles (adaptation des noms de props)
    nom: formData.nom || '',
    prenom: formData.prenom || '',
    genre: formData.genre || '',
    dateNaissance: formData.date_naissance || '',
    cin: formData.cin || '',
    situationMatrimoniale: resolveSituationMatrimoniale(),
    
    // Contact (adaptation des noms de props)
    email: formData.email || '',
    contact: formData.telephone || '', // contact au lieu de telephone
    ville: formData.ville || '',
    
    // Photo (formatée pour créer une URL)
    photo: formatPhotoForCV(),
    
    // Langues et qualités (formatées pour extraire les valeurs des objets)
    langues: formatLanguesForCV(),
    qualites: formatQualitesForCV(),
    
    // Formation (formatée)
    ...formatFormationsForCV(),
    
    // Poste de l'annonce (affiché sous le nom)
    posteAnnonce: annonceData?.Poste?.valeur || '',
    
    // Expériences (formatées)
    experiences: formatExperiencesForCV(),
    passifEntreprises: [], // Pas utilisé dans le formulaire de candidature
    
    // Désactiver l'évaluation dans le contexte de la candidature
    showEvaluation: false,
    
    // Evaluation - toutes à null pour ne pas afficher la section (par sécurité)
    scoreQCM: null,
    scoreEntretienUnite: null,
    scoreEntretienRH: null,
    
    // Callbacks pour les boutons (non utilisés mais requis par le composant)
    onSendQCM: () => {},
    onScheduleUniteInterview: () => {},
    onScheduleRHInterview: () => {}
  };

  // Nettoyer les URLs créées pour éviter les fuites mémoire
  useEffect(() => {
    const photoUrl = formatPhotoForCV();
    return () => {
      if (photoUrl && formData.photo instanceof File) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [formData.photo]);

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>Récapitulatif de votre candidature</h2>
        <p className="summary-notice">
          <em>Veuillez vérifier que toutes les informations ci-dessous sont exactes avant de soumettre votre candidature. 
          Une fois soumise, vous ne pourrez plus modifier ces informations.</em>
        </p>
      </div>
      
      <div className="summary-cv">
        <CV {...cvProps} />
      </div>
    </div>
  );
};

export default SummaryStep;