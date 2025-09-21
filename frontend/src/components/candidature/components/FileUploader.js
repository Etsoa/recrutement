import React, { useState, useEffect } from 'react';
import { FileButton } from '../../index';
import { saveProfileImage, deleteProfileImage, createImagePreviewUrl, revokeImagePreviewUrl, validateImage } from '../../../utils/fileUtils';

const FileUploader = ({ formData, updateFormData, errors = {} }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [currentFileName, setCurrentFileName] = useState(null);

  // Nettoyer l'aperçu quand le composant est démonté
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        revokeImagePreviewUrl(imagePreview);
      }
    };
  }, [imagePreview]);

  // Gestion des fichiers photo
  const handlePhotoChange = async (files, field) => {
    if (files && files.length > 0) {
      const file = files[0];
      
      // Valider l'image
      const validation = validateImage(file, 5);
      if (!validation.isValid) {
        setUploadStatus(`Erreur: ${validation.errors.join(', ')}`);
        return;
      }

      try {
        setUploadStatus('Upload en cours...');
        
        // Upload vers le serveur
        const savedImage = await saveProfileImage(file);
        
        // Créer un aperçu depuis l'URL du serveur
        setImagePreview(savedImage.fullPath);
        setCurrentFileName(savedImage.fileName);
        
        // Mettre à jour les données du formulaire
        updateFormData({ 
          [field]: file,
          photoPath: savedImage.relativePath,
          photoUrl: savedImage.fullPath,
          photoFileName: savedImage.fileName
        });
        
        setUploadStatus('Image uploadée avec succès !');
        
        // Effacer le message de succès après 3 secondes
        setTimeout(() => {
          setUploadStatus('');
        }, 3000);
        
      } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
        setUploadStatus('Erreur lors de l\'upload: ' + error.message);
      }
    }
  };

  // Supprimer la photo
  const removePhoto = async () => {
    try {
      setUploadStatus('Suppression...');
      
      // Supprimer du serveur si un fichier existe
      if (currentFileName) {
        await deleteProfileImage(currentFileName);
      }
      
      // Nettoyer l'aperçu local
      if (imagePreview && imagePreview.startsWith('blob:')) {
        revokeImagePreviewUrl(imagePreview);
      }
      
      setImagePreview(null);
      setCurrentFileName(null);
      
      updateFormData({ 
        photo: null,
        photoPath: null,
        photoUrl: null,
        photoFileName: null
      });
      
      setUploadStatus('Photo supprimée');
      
      // Effacer le message après 2 secondes
      setTimeout(() => {
        setUploadStatus('');
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setUploadStatus('Erreur lors de la suppression');
    }
  };

  return (
    <div className="section">
      <h3>Photo de profil</h3>
      <div className="form-grid">
        <div className="file-upload-container">
          <FileButton
            label="Photo de profil"
            name="photo"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handlePhotoChange}
            maxSize={5}
            showPreview={false}
            error={errors.photo}
            variant="outline"
          />
          
          {/* Aperçu de l'image */}
          {imagePreview && (
            <div className="image-preview-container" style={{ marginTop: '15px', position: 'relative', display: 'inline-block' }}>
              <div className="image-preview" style={{ position: 'relative' }}>
                <img 
                  src={imagePreview} 
                  alt="Aperçu de la photo de profil" 
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid #e1e5e9',
                    display: 'block'
                  }}
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    lineHeight: '1'
                  }}
                  title="Supprimer la photo"
                >
                  ×
                </button>
              </div>
            </div>
          )}
          
          {/* Messages de statut */}
          {uploadStatus && (
            <div 
              className={`upload-status ${uploadStatus.startsWith('Erreur') ? 'error' : 'success'}`}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: uploadStatus.startsWith('Erreur') ? '#f8d7da' : '#d4edda',
                color: uploadStatus.startsWith('Erreur') ? '#721c24' : '#155724',
                border: `1px solid ${uploadStatus.startsWith('Erreur') ? '#f5c6cb' : '#c3e6cb'}`
              }}
            >
              {uploadStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;