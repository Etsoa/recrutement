import React, { useEffect, useState } from 'react';
import CV from '../CV';
import parametresService from '../../services/parametresService';
import '../../styles/CandidatureStep.css';

const SummaryStep = ({ formData, annonceData, errors = {} }) => {
  const [parametres, setParametres] = useState(null);

  // Charger les paramètres pour résoudre les domaines, langues et qualités
  useEffect(() => {
    const loadParametres = async () => {
      try {
        const response = await parametresService.getAllParametres();
        if (response.success && response.data) {
          setParametres(response.data);
          console.log('Paramètres chargés pour récapitulatif:', response.data);
        }
      } catch (error) {
        console.error('Erreur chargement paramètres pour récapitulatif:', error);
      }
    };

    loadParametres();
  }, []);
  // Fonction utilitaire pour formater les formations pour le CV
  const formatFormationsForCV = () => {
    let formations = [];
    
    // D'ABORD : Regrouper toutes les formations pré-universitaires en une seule entrée
    if (formData.formationsPreUniversitaires) {
      let formationsPreUniv = [];
      
      // Ajouter tous les BACs
      if (formData.formationsPreUniversitaires.bacs && formData.formationsPreUniversitaires.bacs.length > 0) {
        formData.formationsPreUniversitaires.bacs.forEach(bac => {
          formationsPreUniv.push(`BAC ${bac.serie}${bac.annee ? ` (${bac.annee})` : ''}${bac.etablissement ? ` - ${bac.etablissement}` : ''}`);
        });
      }
      
      // Ajouter BEPC si présent
      if (formData.formationsPreUniversitaires.bepc) {
        formationsPreUniv.push('BEPC');
      }
      
      // Si on a des formations pré-universitaires, les regrouper EN PREMIER
      if (formationsPreUniv.length > 0) {
        formations.push({
          niveau: 'Formation pré-universitaire',
          filiere: formationsPreUniv.join(' • '),
          etablissement: '',
          annee: '',
          type: 'preuniversitaire'
        });
      }
    }
    
    // ENSUITE : Ajouter toutes les formations universitaires
    if (formData.formationsUniversitaires && formData.formationsUniversitaires.length > 0) {
      formData.formationsUniversitaires.forEach(formation => {
        // Résoudre les niveaux (IDs vers noms)
        let niveauxTexte = '';
        if (formation.niveaux && parametres && parametres.niveaux) {
          const niveauxNoms = formation.niveaux.map(niveauId => {
            const niveau = parametres.niveaux.find(n => n.id_niveau === parseInt(niveauId));
            return niveau ? niveau.valeur : `Niveau ${niveauId}`;
          });
          niveauxTexte = niveauxNoms.join(', ');
        } else if (formation.niveaux) {
          niveauxTexte = formation.niveaux.join(', ');
        }
        
        // Résoudre la filière (ID vers nom)
        let filiereNom = '';
        if (formation.filiere && parametres && parametres.filieres) {
          const filiere = parametres.filieres.find(f => f.id_filiere === parseInt(formation.filiere));
          filiereNom = filiere ? filiere.valeur : `Filière ${formation.filiere}`;
        } else {
          filiereNom = formation.filiere || '';
        }
        
        formations.push({
          niveau: niveauxTexte,
          filiere: filiereNom,
          etablissement: formation.etablissement || '',
          annee: formation.annee || '',
          type: 'universitaire'
        });
      });
    }
    
    // Retourner toutes les formations ET les infos pour compatibilité avec l'ancien CV
    const premiereFformation = formations[0] || { niveau: '', filiere: '', etablissement: '', annee: '' };
    
    return {
      // Pour la compatibilité avec l'ancien affichage (première formation)
      niveau: premiereFformation.niveau,
      filiere: premiereFformation.filiere,
      etablissement: premiereFformation.etablissement,
      annee: premiereFformation.annee,
      // Nouveau : toutes les formations
      formations: formations
    };
  };

  // Fonction utilitaire pour formater les expériences pour le CV
  const formatExperiencesForCV = () => {
    if (!formData.experiences || formData.experiences.length === 0) return [];
    
    return formData.experiences.map(exp => {
      // Résoudre le nom du domaine à partir de l'ID
      let nomDomaine = '';
      if (exp.id_domaine && parametres && parametres.domaines) {
        const domaine = parametres.domaines.find(d => d.id_domaine === parseInt(exp.id_domaine));
        nomDomaine = domaine ? domaine.valeur : `Domaine ${exp.id_domaine}`;
      }
      
      return {
        poste: nomDomaine, // Utiliser le nom du domaine comme "poste"
        entreprise: '', // Plus de nom d'entreprise dans le nouveau format
        dateDebut: exp.date_debut ? new Date(exp.date_debut).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '',
        dateFin: exp.date_fin ? new Date(exp.date_fin).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'En cours',
        description: exp.description_taches || '' // Garder la description
      };
    });
  };

  // Fonction utilitaire pour formater les langues pour le CV
  const formatLanguesForCV = () => {
    if (!formData.langues || formData.langues.length === 0) return [];
    
    return formData.langues.map(langueItem => {
      // Si c'est un objet avec une propriété 'langue' qui contient un ID
      if (typeof langueItem === 'object' && langueItem.langue) {
        const langueId = langueItem.langue;
        // Résoudre l'ID en nom si on a les paramètres
        if (parametres && parametres.langues) {
          const langue = parametres.langues.find(l => l.id_langue === parseInt(langueId));
          return langue ? langue.valeur : `Langue ${langueId}`;
        }
        return `Langue ${langueId}`;
      }
      // Si c'est déjà une string, la retourner telle quelle
      return langueItem;
    });
  };

  // Fonction utilitaire pour formater les qualités pour le CV
  const formatQualitesForCV = () => {
    if (!formData.qualites || formData.qualites.length === 0) return [];
    
    return formData.qualites.map(qualiteItem => {
      // Si c'est un objet avec une propriété 'qualite' qui contient un ID
      if (typeof qualiteItem === 'object' && qualiteItem.qualite) {
        const qualiteId = qualiteItem.qualite;
        // Résoudre l'ID en nom si on a les paramètres
        if (parametres && parametres.qualites) {
          const qualite = parametres.qualites.find(q => q.id_qualite === parseInt(qualiteId));
          return qualite ? qualite.valeur : `Qualité ${qualiteId}`;
        }
        return `Qualité ${qualiteId}`;
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
        {parametres ? (
          <CV {...cvProps} />
        ) : (
          <div className="loading-message">
            <p>Chargement du récapitulatif...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryStep;