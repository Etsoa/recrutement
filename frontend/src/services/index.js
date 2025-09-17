// services/index.js - Point d'entrée pour tous les services
export { default as api, authUtils } from './api';
export { default as userService } from './userService';
export { default as cvService } from './cvService';
export { default as jobService } from './jobService';

// Service d'authentification (à développer)
export { default as authService } from './authService';

// Service de notifications (à développer)
export { default as notificationService } from './notificationService';
