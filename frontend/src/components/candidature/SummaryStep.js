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

  // Fonction pour enrichir formData avec les valeurs textuelles
  const enrichFormDataWithValues = (formData, parametres) => {
    if (!parametres) return formData;

    const enrichedData = { ...formData };

    // Enrichir le genre
    if (enrichedData.genre && parametres.genres) {
      const genre = parametres.genres.find(g => g.id_genre === parseInt(enrichedData.genre));
      if (genre) {
        enrichedData.genre = genre.valeur;
      }
    }

    // Enrichir la ville
    if (enrichedData.ville && parametres.villes) {
      const ville = parametres.villes.find(v => v.id_ville === parseInt(enrichedData.ville));
      if (ville) {
        enrichedData.ville = ville.valeur;
      }
    }

    // Enrichir la situation matrimoniale
    if (enrichedData.situation_matrimoniale && parametres.situationMatrimoniales) {
      const situation = parametres.situationMatrimoniales.find(s => s.id_situation === parseInt(enrichedData.situation_matrimoniale));
      if (situation) {
        enrichedData.situation_matrimoniale = situation.valeur;
      }
    }

    // Enrichir les langues
    if (enrichedData.langues && parametres.langues) {
      enrichedData.langues = enrichedData.langues.map(langueItem => {
        if (typeof langueItem === 'object' && langueItem.langue) {
          const langue = parametres.langues.find(l => l.id_langue === parseInt(langueItem.langue));
          return langue ? langue.valeur : langueItem;
        }
        return langueItem;
      });
    }

    // Enrichir les qualités
    if (enrichedData.qualites && parametres.qualites) {
      enrichedData.qualites = enrichedData.qualites.map(qualiteItem => {
        if (typeof qualiteItem === 'object' && qualiteItem.qualite) {
          const qualite = parametres.qualites.find(q => q.id_qualite === parseInt(qualiteItem.qualite));
          return qualite ? qualite.valeur : qualiteItem;
        }
        return qualiteItem;
      });
    }

    // Enrichir les formations avec niveaux et filières
    if (enrichedData.formations && parametres.niveaux && parametres.filieres) {
      enrichedData.formations = enrichedData.formations.map(formation => {
        const enrichedFormation = { ...formation };
        
        if (formation.id_niveau) {
          const niveau = parametres.niveaux.find(n => n.id_niveau === parseInt(formation.id_niveau));
          if (niveau) {
            enrichedFormation.niveau = niveau.valeur;
          }
        }
        
        if (formation.id_filiere) {
          const filiere = parametres.filieres.find(f => f.id_filiere === parseInt(formation.id_filiere));
          if (filiere) {
            enrichedFormation.filiere = filiere.valeur;
          }
        }
        
        return enrichedFormation;
      });
    }

    // Enrichir les formations universitaires
    if (enrichedData.formationsUniversitaires && parametres.niveaux && parametres.filieres) {
      enrichedData.formationsUniversitaires = enrichedData.formationsUniversitaires.map(formation => {
        const enrichedFormation = { ...formation };
        
        // Enrichir les niveaux (array d'IDs vers array de valeurs)
        if (formation.niveaux && Array.isArray(formation.niveaux)) {
          enrichedFormation.niveaux = formation.niveaux.map(niveauId => {
            const niveau = parametres.niveaux.find(n => n.id_niveau === parseInt(niveauId));
            return niveau ? niveau.valeur : niveauId;
          });
        }
        
        // Enrichir la filière
        if (formation.filiere) {
          const filiere = parametres.filieres.find(f => f.id_filiere === parseInt(formation.filiere));
          if (filiere) {
            enrichedFormation.filiere = filiere.valeur;
          }
        }
        
        return enrichedFormation;
      });
    }

    // Enrichir les formations pré-universitaires
    if (enrichedData.formationsPreUniversitaires?.bacs && parametres.filieres) {
      enrichedData.formationsPreUniversitaires.bacs = enrichedData.formationsPreUniversitaires.bacs.map(bac => {
        const enrichedBac = { ...bac };
        
        // Si on a un id_filiere, le convertir en nom de série
        if (bac.id_filiere) {
          const filiere = parametres.filieres.find(f => f.id_filiere === parseInt(bac.id_filiere));
          if (filiere) {
            enrichedBac.serie = filiere.valeur;
          }
        }
        
        // Si on a déjà une propriété serie qui est un ID, la convertir aussi
        if (bac.serie && !isNaN(bac.serie)) {
          const filiere = parametres.filieres.find(f => f.id_filiere === parseInt(bac.serie));
          if (filiere) {
            enrichedBac.serie = filiere.valeur;
          }
        }
        
        return enrichedBac;
      });
    }

    // Enrichir les expériences avec domaines
    if (enrichedData.experiences && parametres.domaines) {
      enrichedData.experiences = enrichedData.experiences.map(exp => {
        const enrichedExp = { ...exp };
        if (exp.id_domaine) {
          const domaine = parametres.domaines.find(d => d.id_domaine === parseInt(exp.id_domaine));
          if (domaine) {
            enrichedExp.domaine = domaine.valeur;
          }
        }
        return enrichedExp;
      });
    }

    return enrichedData;
  };
  // Fonction utilitaire pour formater les formations pour le CV
  const formatFormationsForCV = (enrichedData) => {
    let formations = [];
    
    // D'ABORD : Regrouper toutes les formations pré-universitaires en une seule entrée (maintenant enrichies)
    if (enrichedData.formationsPreUniversitaires) {
      let formationsPreUniv = [];
      
      // Ajouter tous les BACs (maintenant avec series enrichies)
      if (enrichedData.formationsPreUniversitaires.bacs && enrichedData.formationsPreUniversitaires.bacs.length > 0) {
        enrichedData.formationsPreUniversitaires.bacs.forEach(bac => {
          formationsPreUniv.push(`BAC ${bac.serie}${bac.annee ? ` (${bac.annee})` : ''}${bac.etablissement ? ` - ${bac.etablissement}` : ''}`);
        });
      }
      
      // Ajouter BEPC si présent
      if (enrichedData.formationsPreUniversitaires.bepc) {
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
    
    // ENSUITE : Ajouter toutes les formations universitaires (maintenant enrichies)
    if (enrichedData.formationsUniversitaires && enrichedData.formationsUniversitaires.length > 0) {
      enrichedData.formationsUniversitaires.forEach(formation => {
        // Les niveaux et filières sont maintenant déjà enrichis
        let niveauxTexte = '';
        if (formation.niveaux) {
          niveauxTexte = Array.isArray(formation.niveaux) ? formation.niveaux.join(', ') : formation.niveaux;
        }
        
        formations.push({
          niveau: niveauxTexte,
          filiere: formation.filiere || '',
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
  const formatExperiencesForCV = (enrichedData) => {
    if (!enrichedData.experiences || enrichedData.experiences.length === 0) return [];
    
    return enrichedData.experiences.map(exp => ({
      poste: exp.domaine || 'Expérience professionnelle', // Utiliser la valeur enrichie
      entreprise: '', // Plus de nom d'entreprise dans le nouveau format
      dateDebut: exp.date_debut ? new Date(exp.date_debut).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '',
      dateFin: exp.date_fin ? new Date(exp.date_fin).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'En cours',
      description: exp.description_taches || '' // Garder la description
    }));
  };

  // Fonction utilitaire pour formater les langues pour le CV
  const formatLanguesForCV = (enrichedData) => {
    if (!enrichedData.langues || enrichedData.langues.length === 0) return [];
    
    // Les langues sont maintenant déjà enrichies avec les valeurs textuelles
    return enrichedData.langues;
  };

  // Fonction utilitaire pour formater les qualités pour le CV
  const formatQualitesForCV = (enrichedData) => {
    if (!enrichedData.qualites || enrichedData.qualites.length === 0) return [];
    
    // Les qualités sont maintenant déjà enrichies avec les valeurs textuelles
    return enrichedData.qualites;
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

  // Fonction utilitaire pour résoudre la situation matrimoniale (maintenant utilise les données enrichies)
  const resolveSituationMatrimoniale = (enrichedData) => {
    const situationValue = enrichedData.situation_matrimoniale;
    
    if (!situationValue) return '';
    
    // Les données sont maintenant enrichies, donc on retourne directement la valeur
    if (typeof situationValue === 'string') {
      return situationValue;
    }
    
    // Si c'est un objet avec une propriété value ou label (pour compatibilité)
    if (typeof situationValue === 'object') {
      return situationValue.value || situationValue.label || situationValue.valeur || '';
    }
    
    return '';
  };

  // Enrichir les données avant de créer les props du CV
  const enrichedData = enrichFormDataWithValues(formData, parametres);

  // Mapper les données enrichies vers les props du CV
  const cvProps = {
    // Informations personnelles (maintenant avec valeurs textuelles)
    nom: enrichedData.nom || '',
    prenom: enrichedData.prenom || '',
    genre: enrichedData.genre || '', // Maintenant enrichi avec la valeur textuelle
    dateNaissance: enrichedData.date_naissance || '',
    cin: enrichedData.cin || '',
    situationMatrimoniale: resolveSituationMatrimoniale(enrichedData),
    
    // Contact (adaptation des noms de props)
    email: enrichedData.email || '',
    contact: enrichedData.telephone || '', // contact au lieu de telephone
    ville: enrichedData.ville || '', // Maintenant enrichi avec la valeur textuelle
    
    // Photo (formatée pour créer une URL)
    photo: formatPhotoForCV(),
    
    // Langues et qualités (maintenant enrichies avec valeurs textuelles)
    langues: formatLanguesForCV(enrichedData),
    qualites: formatQualitesForCV(enrichedData),
    
    // Formation (formatée avec données enrichies)
    ...formatFormationsForCV(enrichedData),
    
    // Poste de l'annonce (affiché sous le nom)
    posteAnnonce: annonceData?.Poste?.valeur || '',
    
    // Expériences (formatées avec données enrichies)
    experiences: formatExperiencesForCV(enrichedData),
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