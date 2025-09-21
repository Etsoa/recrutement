import React from 'react';
import { FileButton } from '../../index';

const FileUploader = ({ formData, updateFormData, errors = {} }) => {
  // Gestion des fichiers
  const handleFileChange = (files, field) => {
    if (files && files.length > 0) {
      updateFormData({ [field]: files[0] });
    }
  };

  return (
    <div className="section">
      <h3>Photo de profil</h3>
      <div className="form-grid">
        <FileButton
          label="Photo de profil"
          name="photo"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          maxSize={5}
          showPreview={false}
          error={errors.photo}
          variant="outline"
        />
      </div>
    </div>
  );
};

export default FileUploader;