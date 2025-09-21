// Utilitaires pour la gestion des fichiers
import axios from 'axios';

// Configuration de base pour axios
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + '/public';

// Instance axios pour les uploads
const uploadClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 secondes pour les uploads
});

/**
 * Sauvegarde une image de profil sur le serveur via API
 * @param {File} file - Le fichier image à sauvegarder
 * @returns {Promise<Object>} - Les informations du fichier sauvegardé
 */
export const saveProfileImage = async (file) => {
  try {
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Le fichier doit être une image');
    }

    // Créer un FormData pour l'upload
    const formData = new FormData();
    formData.append('photo', file);

    // Envoyer le fichier au serveur avec axios
    const response = await uploadClient.post('/upload/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const result = response.data;

    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de l\'upload');
    }

    return {
      fileName: result.data.fileName,
      relativePath: result.data.relativePath,
      fullPath: result.data.url,
      originalName: result.data.originalName,
      fileSize: result.data.fileSize,
      file: file // Garder une référence au fichier original pour l'aperçu
    };

  } catch (error) {
    console.error('Erreur saveProfileImage:', error);
    // Gérer les erreurs axios
    if (error.response) {
      throw new Error(error.response.data?.message || 'Erreur serveur lors de l\'upload');
    } else if (error.request) {
      throw new Error('Impossible de contacter le serveur');
    } else {
      throw error;
    }
  }
};

/**
 * Supprime une photo du serveur
 * @param {string} filename - Le nom du fichier à supprimer
 * @returns {Promise<boolean>} - Succès de la suppression
 */
export const deleteProfileImage = async (filename) => {
  try {
    const response = await uploadClient.delete(`/upload/photo/${filename}`);
    return response.data.success;

  } catch (error) {
    console.error('Erreur deleteProfileImage:', error);
    return false;
  }
};

/**
 * Crée une URL temporaire pour prévisualiser une image
 * @param {File} file - Le fichier image
 * @returns {string} - URL temporaire pour l'aperçu
 */
export const createImagePreviewUrl = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    return null;
  }
  return URL.createObjectURL(file);
};

/**
 * Nettoie les URLs temporaires créées
 * @param {string} url - L'URL à nettoyer
 */
export const revokeImagePreviewUrl = (url) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Valide le format et la taille d'une image
 * @param {File} file - Le fichier à valider
 * @param {number} maxSizeMB - Taille maximale en MB
 * @returns {Object} - Résultat de la validation
 */
export const validateImage = (file, maxSizeMB = 5) => {
  const result = {
    isValid: true,
    errors: []
  };

  // Vérifier si c'est un fichier
  if (!file) {
    result.isValid = false;
    result.errors.push('Aucun fichier sélectionné');
    return result;
  }

  // Vérifier le type
  if (!file.type.startsWith('image/')) {
    result.isValid = false;
    result.errors.push('Le fichier doit être une image');
  }

  // Vérifier les formats supportés
  const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!supportedFormats.includes(file.type)) {
    result.isValid = false;
    result.errors.push('Format non supporté. Utilisez JPEG, PNG, GIF ou WebP');
  }

  // Vérifier la taille
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    result.isValid = false;
    result.errors.push(`La taille du fichier (${fileSizeMB.toFixed(2)}MB) dépasse la limite de ${maxSizeMB}MB`);
  }

  return result;
};