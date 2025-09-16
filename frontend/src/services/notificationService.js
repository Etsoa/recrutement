// services/notificationService.js - Service pour les notifications
export const notificationService = {
  // Afficher une notification de succès
  showSuccess: (message, options = {}) => {
    console.log('✅ Succès:', message);
    // Intégration future avec une bibliothèque de notifications (react-toastify, etc.)
    return {
      type: 'success',
      message,
      duration: options.duration || 3000,
      ...options,
    };
  },

  // Afficher une notification d'erreur
  showError: (message, options = {}) => {
    console.error('❌ Erreur:', message);
    return {
      type: 'error',
      message,
      duration: options.duration || 5000,
      ...options,
    };
  },

  // Afficher une notification d'information
  showInfo: (message, options = {}) => {
    console.info('ℹ️ Info:', message);
    return {
      type: 'info',
      message,
      duration: options.duration || 3000,
      ...options,
    };
  },

  // Afficher une notification d'avertissement
  showWarning: (message, options = {}) => {
    console.warn('⚠️ Avertissement:', message);
    return {
      type: 'warning',
      message,
      duration: options.duration || 4000,
      ...options,
    };
  },

  // Afficher une notification de chargement
  showLoading: (message, options = {}) => {
    console.log('⏳ Chargement:', message);
    return {
      type: 'loading',
      message,
      duration: options.duration || null, // Pas de durée par défaut pour le chargement
      ...options,
    };
  },

  // Fermer toutes les notifications
  clearAll: () => {
    console.log('🧹 Notifications supprimées');
    // Logique pour fermer toutes les notifications
  },

  // Notifications push (pour plus tard)
  requestPermission: async () => {
    if (!('Notification' in window)) {
      return { success: false, message: 'Ce navigateur ne supporte pas les notifications' };
    }

    const permission = await Notification.requestPermission();
    return {
      success: permission === 'granted',
      permission,
      message: permission === 'granted' ? 'Notifications autorisées' : 'Notifications refusées',
    };
  },

  // Envoyer une notification push
  sendPushNotification: (title, options = {}) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return { success: false, message: 'Notifications non autorisées' };
    }

    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options,
    });

    return { success: true, notification };
  },
};

export default notificationService;
