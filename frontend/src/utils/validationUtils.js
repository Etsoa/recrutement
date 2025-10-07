/**
 * Utilitaires de validation pour le système Axiom
 * Fonctions de validation réutilisables
 */

export class ValidationUtils {
  /**
   * Valider les données d'une annonce
   */
  static validateAnnonce(data) {
    const errors = {};

    // Validation du poste
    if (!data.id_poste) {
      errors.poste = 'Le poste est obligatoire';
    }

    // Validation de la ville
    if (!data.id_ville) {
      errors.ville = 'La ville est obligatoire';
    }

    // Validation des âges
    if (!data.age_min || data.age_min < 18) {
      errors.age_min = 'L\'âge minimum doit être au moins 18 ans';
    }

    if (!data.age_max || data.age_max > 65) {
      errors.age_max = 'L\'âge maximum ne peut pas dépasser 65 ans';
    }

    if (data.age_min && data.age_max && data.age_min >= data.age_max) {
      errors.age = 'L\'âge minimum doit être inférieur à l\'âge maximum';
    }

    // Validation du genre
    if (!data.id_genre) {
      errors.genre = 'Le genre est obligatoire';
    }

    // Validation des critères
    if (!data.niveau_filiere || data.niveau_filiere.length === 0) {
      errors.niveau_filiere = 'Au moins un niveau de formation est requis';
    }

    if (!data.langues || data.langues.length === 0) {
      errors.langues = 'Au moins une langue est requise';
    }

    if (!data.qualites || data.qualites.length === 0) {
      errors.qualites = 'Au moins une qualité est requise';
    }

    if (!data.experiences || data.experiences.length === 0) {
      errors.experiences = 'Au moins une expérience est requise';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Valider les données d'un candidat
   */
  static validateCandidat(data) {
    const errors = {};

    if (!data.nom || data.nom.trim().length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!data.prenom || data.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.email = 'Email invalide';
    }

    if (!data.contact || !this.isValidPhone(data.contact)) {
      errors.contact = 'Numéro de téléphone invalide';
    }

    if (!data.date_naissance) {
      errors.date_naissance = 'Date de naissance obligatoire';
    } else {
      const age = this.calculateAge(data.date_naissance);
      if (age < 18 || age > 65) {
        errors.age = 'L\'âge doit être entre 18 et 65 ans';
      }
    }

    if (!data.cin || data.cin.trim().length < 8) {
      errors.cin = 'CIN invalide (minimum 8 caractères)';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Valider un créneau d'entretien
   */
  static validateEntretienSlot(date, time, joursFeries = [], horairesOuvres = {}) {
    const errors = [];
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    // Vérifier que ce n'est pas dans le passé
    const now = new Date();
    if (selectedDate < now.setHours(0, 0, 0, 0)) {
      errors.push('La date ne peut pas être dans le passé');
    }

    // Vérifier jour ouvré (lundi-vendredi)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      errors.push('Les entretiens ne sont possibles qu\'en semaine (lundi-vendredi)');
    }

    // Vérifier jours fériés
    const dateString = selectedDate.toISOString().split('T')[0];
    if (joursFeries.includes(dateString)) {
      errors.push('Les entretiens ne sont pas possibles les jours fériés');
    }

    // Vérifier horaires ouvrés
    if (time) {
      const [hour, minute] = time.split(':').map(Number);
      const timeMinutes = hour * 60 + minute;
      
      const startTime = horairesOuvres.debut || 480; // 8h par défaut
      const endTime = horairesOuvres.fin || 1080; // 18h par défaut

      if (timeMinutes < startTime || timeMinutes > endTime) {
        const startHour = Math.floor(startTime / 60);
        const endHour = Math.floor(endTime / 60);
        errors.push(`Les entretiens ne sont possibles que de ${startHour}h à ${endHour}h`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Valider un score d'entretien
   */
  static validateScore(score, min = 0, max = 20) {
    if (typeof score !== 'number' || isNaN(score)) {
      return { isValid: false, error: 'Le score doit être un nombre' };
    }

    if (score < min || score > max) {
      return { isValid: false, error: `Le score doit être entre ${min} et ${max}` };
    }

    return { isValid: true };
  }

  /**
   * Utilitaires de validation de base
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone) {
    const phoneRegex = /^[0-9+\-\s()]{8,15}$/;
    return phoneRegex.test(phone);
  }

  static calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  /**
   * Valider les permissions d'accès
   */
  static validateAccess(userRole, requiredRole) {
    const roleHierarchy = {
      'unite': 1,
      'rh': 2,
      'ceo': 3,
      'admin': 4
    };

    const userLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    return userLevel >= requiredLevel;
  }

  /**
   * Valider les critères de correspondance candidat/annonce
   */
  static validateCandidateMatch(candidat, annonce) {
    const issues = [];

    // Vérifier l'âge
    const age = this.calculateAge(candidat.date_naissance);
    if (age < annonce.age_min || age > annonce.age_max) {
      issues.push(`Âge non conforme (${age} ans, requis: ${annonce.age_min}-${annonce.age_max})`);
    }

    // Vérifier le genre si spécifié
    if (annonce.id_genre && candidat.id_genre !== annonce.id_genre) {
      issues.push('Genre non conforme aux exigences');
    }

    // Vérifier les langues (au moins une langue en commun)
    const candidatLangues = candidat.langues || [];
    const annonceLangues = annonce.langues || [];
    const languesCommunes = candidatLangues.filter(lang => 
      annonceLangues.some(aLang => aLang.id_langue === lang.id_langue)
    );

    if (languesCommunes.length === 0) {
      issues.push('Aucune langue requise maîtrisée');
    }

    // Vérifier les qualités (au moins 50% des qualités requises)
    const candidatQualites = candidat.qualites || [];
    const annonceQualites = annonce.qualites || [];
    const qualitesCommunes = candidatQualites.filter(qual => 
      annonceQualites.some(aQual => aQual.id_qualite === qual.id_qualite)
    );

    const qualiteMatchPercentage = annonceQualites.length > 0 ? 
      (qualitesCommunes.length / annonceQualites.length) * 100 : 100;

    if (qualiteMatchPercentage < 50) {
      issues.push(`Qualités insuffisantes (${Math.round(qualiteMatchPercentage)}% de correspondance, minimum 50%)`);
    }

    return {
      isMatch: issues.length === 0,
      issues,
      score: Math.max(0, 100 - (issues.length * 20)) // Score sur 100
    };
  }
}

export default ValidationUtils;