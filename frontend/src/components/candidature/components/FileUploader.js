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
      <h3>Documents</h3>
      <div className="form-grid">
        <FileButton
          label="Photo de profil"
          name="photo"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          maxSize={5}
          showPreview={true}
          previewType="image"
          error={errors.photo}
          variant="outline"
        />

        <FileButton
          label="CV (PDF ou Image)"
          name="cv"
          accept=".pdf,image/jpeg,image/png"
          onChange={handleFileChange}
          required={true}
          maxSize={5}
          showPreview={true}
          previewType="document"
          error={errors.cv}
        />
      </div>
    </div>
  );
};

export default FileUploader;