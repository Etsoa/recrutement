/**
 * Gestionnaire de sessions pour le système Axiom
 * Gestion sécurisée des sessions avec expiration automatique
 */

export class SessionManager {
  static SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures
  static WARNING_TIME = 5 * 60 * 1000; // 5 minutes avant expiration

  /**
   * Vérifier si une session est valide
   */
  static isSessionValid(sessionKey = 'uniteSession') {
    try {
      const sessionData = localStorage.getItem(sessionKey);
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      const now = Date.now();

      if (!session.expiresAt || now > session.expiresAt) {
        this.clearSession(sessionKey);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification de session:', error);
      this.clearSession(sessionKey);
      return false;
    }
  }

  /**
   * Obtenir les données de session
   */
  static getSessionData(sessionKey = 'uniteSession') {
    try {
      if (!this.isSessionValid(sessionKey)) return null;

      const sessionData = localStorage.getItem(sessionKey);
      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Erreur lors de la récupération de session:', error);
      return null;
    }
  }

  /**
   * Créer une nouvelle session
   */
  static createSession(data, sessionKey = 'uniteSession') {
    const sessionData = {
      ...data,
      loginTime: Date.now(),
      expiresAt: Date.now() + this.SESSION_DURATION
    };

    localStorage.setItem(sessionKey, JSON.stringify(sessionData));
    return sessionData;
  }

  /**
   * Étendre la session
   */
  static extendSession(sessionKey = 'uniteSession') {
    const session = this.getSessionData(sessionKey);
    if (session) {
      session.expiresAt = Date.now() + this.SESSION_DURATION;
      localStorage.setItem(sessionKey, JSON.stringify(session));
    }
  }

  /**
   * Nettoyer la session
   */
  static clearSession(sessionKey = 'uniteSession') {
    localStorage.removeItem(sessionKey);
    if (sessionKey === 'uniteSession') {
      localStorage.removeItem('selectedUnite');
      localStorage.removeItem('id_unite');
    }
  }

  /**
   * Vérifier si la session expire bientôt
   */
  static isSessionExpiringSoon(sessionKey = 'uniteSession') {
    const session = this.getSessionData(sessionKey);
    if (!session) return false;

    const timeLeft = session.expiresAt - Date.now();
    return timeLeft <= this.WARNING_TIME;
  }

  /**
   * Initialiser la surveillance de session
   */
  static initSessionMonitoring(onExpiry, onWarning) {
    const checkSession = () => {
      if (!this.isSessionValid()) {
        onExpiry && onExpiry();
        return;
      }

      if (this.isSessionExpiringSoon()) {
        onWarning && onWarning();
      }
    };

    // Vérifier toutes les minutes
    return setInterval(checkSession, 60000);
  }
}

export default SessionManager;