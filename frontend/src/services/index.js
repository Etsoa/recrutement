// services/index.js - Point d'entrée pour tous les services
export { default as api, authUtils } from './api';
export { default as userService } from './userService';
export { default as cvService } from './cvService';
export { default as jobService } from './jobService';
export { default as annoncesService } from './annoncesService';
export { default as ficheCandidatService } from './ficheCandidatService';

// Service d'authentification (à développer)
export { default as authService } from './authService';

// Service de notifications (à développer)
export { default as notificationService } from './notificationService';
