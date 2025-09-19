import React from 'react';
import Button from './Button';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ 
  title = "Une erreur s'est produite", 
  message = "Veuillez réessayer plus tard", 
  onRetry = null,
  onBack = null,
  type = "error" 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default:
        return '❌';
    }
  };

  return (
    <div className={`error-container ${type}`}>
      <div className="error-icon">{getIcon()}</div>
      <h2 className="error-title">{title}</h2>
      <p className="error-message">{message}</p>
      <div className="error-actions">
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            Réessayer
          </Button>
        )}
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            Retour
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;