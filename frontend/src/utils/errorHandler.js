/**
 * Gestionnaire d'erreurs pour le système Axiom
 * Gestion centralisée des erreurs avec notifications utilisateur
 */

export class ErrorHandler {
  /**
   * Types d'erreurs
   */
  static ERROR_TYPES = {
    VALIDATION: 'validation',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    NETWORK: 'network',
    SERVER: 'server',
    NOT_FOUND: 'not_found',
    CONFLICT: 'conflict',
    BUSINESS_RULE: 'business_rule'
  };

  /**
   * Messages d'erreur par défaut
   */
  static DEFAULT_MESSAGES = {
    [this.ERROR_TYPES.VALIDATION]: 'Données invalides',
    [this.ERROR_TYPES.AUTHENTICATION]: 'Identifiants incorrects',
    [this.ERROR_TYPES.AUTHORIZATION]: 'Accès non autorisé',
    [this.ERROR_TYPES.NETWORK]: 'Erreur de connexion',
    [this.ERROR_TYPES.SERVER]: 'Erreur serveur',
    [this.ERROR_TYPES.NOT_FOUND]: 'Ressource non trouvée',
    [this.ERROR_TYPES.CONFLICT]: 'Conflit de données',
    [this.ERROR_TYPES.BUSINESS_RULE]: 'Règle métier non respectée'
  };

  /**
   * Gérer une erreur API
   */
  static handleApiError(error, context = '') {
    let errorType = this.ERROR_TYPES.SERVER;
    let message = 'Une erreur inattendue s\'est produite';
    let details = null;

    if (error.response) {
      // Erreur de réponse HTTP
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          errorType = this.ERROR_TYPES.VALIDATION;
          message = data.message || 'Données invalides';
          details = data.errors;
          break;
        case 401:
          errorType = this.ERROR_TYPES.AUTHENTICATION;
          message = 'Session expirée ou identifiants incorrects';
          break;
        case 403:
          errorType = this.ERROR_TYPES.AUTHORIZATION;
          message = 'Vous n\'avez pas les permissions nécessaires';
          break;
        case 404:
          errorType = this.ERROR_TYPES.NOT_FOUND;
          message = data.message || 'Ressource non trouvée';
          break;
        case 409:
          errorType = this.ERROR_TYPES.CONFLICT;
          message = data.message || 'Conflit de données';
          break;
        case 422:
          errorType = this.ERROR_TYPES.BUSINESS_RULE;
          message = data.message || 'Règle métier non respectée';
          details = data.errors;
          break;
        default:
          errorType = this.ERROR_TYPES.SERVER;
          message = data.message || `Erreur serveur (${status})`;
      }
    } else if (error.request) {
      // Erreur de réseau
      errorType = this.ERROR_TYPES.NETWORK;
      message = 'Impossible de contacter le serveur';
    } else {
      // Erreur de configuration
      message = error.message || message;
    }

    return {
      type: errorType,
      message: context ? `${context}: ${message}` : message,
      details,
      originalError: error
    };
  }

  /**
   * Gérer les erreurs de validation
   */
  static handleValidationErrors(errors, context = '') {
    const errorMessages = [];

    if (Array.isArray(errors)) {
      errorMessages.push(...errors);
    } else if (typeof errors === 'object') {
      Object.entries(errors).forEach(([field, error]) => {
        if (Array.isArray(error)) {
          errorMessages.push(...error.map(err => `${field}: ${err}`));
        } else {
          errorMessages.push(`${field}: ${error}`);
        }
      });
    } else {
      errorMessages.push(errors.toString());
    }

    return {
      type: this.ERROR_TYPES.VALIDATION,
      message: context ? `${context}: Erreurs de validation` : 'Erreurs de validation',
      details: errorMessages,
      count: errorMessages.length
    };
  }

  /**
   * Gérer les erreurs de règles métier
   */
  static handleBusinessRuleError(rule, message, data = null) {
    return {
      type: this.ERROR_TYPES.BUSINESS_RULE,
      message: `Règle métier "${rule}": ${message}`,
      rule,
      data,
      severity: 'high'
    };
  }

  /**
   * Logger les erreurs (pour le développement)
   */
  static logError(error, context = '') {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      context,
      type: error.type || 'unknown',
      message: error.message,
      details: error.details,
      stack: error.originalError?.stack
    };

    console.group(`🚨 Erreur ${error.type || 'unknown'} - ${context}`);
    console.error('Message:', error.message);
    if (error.details) console.error('Détails:', error.details);
    if (error.originalError?.stack) console.error('Stack:', error.originalError.stack);
    console.groupEnd();

    // En production, envoyer au service de logging
    if (process.env.NODE_ENV === 'production') {
      this.sendToLoggingService(logEntry);
    }
  }

  /**
   * Envoyer au service de logging (à implémenter)
   */
  static sendToLoggingService(logEntry) {
    // À implémenter selon le service de logging choisi
    // Ex: Sentry, LogRocket, etc.
  }

  /**
   * Créer une erreur personnalisée
   */
  static createError(type, message, details = null) {
    return {
      type,
      message,
      details,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Vérifier si une erreur est récupérable
   */
  static isRecoverableError(error) {
    const recoverableTypes = [
      this.ERROR_TYPES.VALIDATION,
      this.ERROR_TYPES.BUSINESS_RULE,
      this.ERROR_TYPES.CONFLICT,
      this.ERROR_TYPES.NOT_FOUND
    ];

    return recoverableTypes.includes(error.type);
  }

  /**
   * Obtenir les actions suggérées pour une erreur
   */
  static getSuggestedActions(error) {
    const actions = [];

    switch (error.type) {
      case this.ERROR_TYPES.AUTHENTICATION:
        actions.push('Vérifiez vos identifiants', 'Reconnectez-vous');
        break;
      case this.ERROR_TYPES.AUTHORIZATION:
        actions.push('Contactez votre administrateur', 'Vérifiez vos permissions');
        break;
      case this.ERROR_TYPES.NETWORK:
        actions.push('Vérifiez votre connexion internet', 'Réessayez dans quelques instants');
        break;
      case this.ERROR_TYPES.VALIDATION:
        actions.push('Corrigez les erreurs signalées', 'Vérifiez les champs obligatoires');
        break;
      case this.ERROR_TYPES.BUSINESS_RULE:
        actions.push('Respectez les règles métier', 'Contactez le support si nécessaire');
        break;
      default:
        actions.push('Réessayez', 'Contactez le support technique');
    }

    return actions;
  }
}

export default ErrorHandler;