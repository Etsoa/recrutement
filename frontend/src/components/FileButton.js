import React, { useRef, useState } from 'react';
import '../styles/FileButton.css';

const FileButton = ({ 
  label, 
  accept = "*/*",
  multiple = false,
  onChange, 
  name,
  required = false,
  error,
  disabled = false,
  className = "",
  variant = "primary", // primary, secondary, outline
  size = "medium", // small, medium, large
  maxSize = null, // en MB
  showPreview = false,
  previewType = "image" // image, document
}) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    
    // Validation de la taille si spécifiée
    if (maxSize) {
      const invalidFiles = fileArray.filter(file => file.size > maxSize * 1024 * 1024);
      if (invalidFiles.length > 0) {
        alert(`Certains fichiers dépassent la taille maximale de ${maxSize}MB`);
        return;
      }
    }
    
    setSelectedFiles(fileArray);
    onChange(fileArray, name);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (!disabled) {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileSelect(files);
      }
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onChange(newFiles, name);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`file-button-container ${className} ${error ? 'error' : ''}`}>
      {label && (
        <label className="file-button-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <div 
        className={`file-drop-zone ${variant} ${size} ${dragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="file-input"
          name={name}
          required={required}
        />
        
        <div className="file-drop-content">
          <div className="file-icon">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </div>
          
          <div className="file-text">
            <p className="file-primary-text">
              {selectedFiles.length > 0 
                ? `${selectedFiles.length} fichier${selectedFiles.length > 1 ? 's' : ''} sélectionné${selectedFiles.length > 1 ? 's' : ''}`
                : "Cliquez pour sélectionner ou glissez-déposez"
              }
            </p>
            <p className="file-secondary-text">
              {maxSize && `Taille max: ${maxSize}MB`}
            </p>
          </div>
        </div>
      </div>
      
      {showPreview && selectedFiles.length > 0 && (
        <div className="file-preview-list">
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-preview-item">
              {previewType === "image" && file.type.startsWith('image/') && (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={file.name}
                  className="file-preview-image"
                />
              )}
              
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="file-remove"
                disabled={disabled}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="file-button-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileButton;