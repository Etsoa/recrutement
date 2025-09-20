import React from 'react';

const ErrorMessage = ({ error, onRetry, onBackToAnnonces }) => {
  return (
    <div className="error-message-container">
      <div className="error-card">
        <div className="error-icon">
          ✕
        </div>
        
        <h2>Erreur lors de l'envoi</h2>
        
        <p className="error-description">
          Une erreur s'est produite lors de l'envoi de votre candidature. 
          Veuillez réessayer ou contacter le support technique.
        </p>
        
        {error && (
          <div className="error-details">
            <details>
              <summary>Détails de l'erreur</summary>
              <p className="error-technical">{error}</p>
            </details>
          </div>
        )}
        
        <div className="error-suggestions">
          <h3>Solutions possibles :</h3>
          <ul>
            <li>Vérifiez votre connexion internet</li>
            <li>Assurez-vous que vos fichiers ne dépassent pas 10MB</li>
            <li>Réessayez dans quelques minutes</li>
            <li>Contactez le support si le problème persiste</li>
          </ul>
        </div>
        
        <div className="error-actions">
          <button 
            className="btn-primary"
            onClick={onRetry}
          >
            Réessayer l'envoi
          </button>
          <button 
            className="btn-secondary"
            onClick={onBackToAnnonces}
          >
            Retour aux annonces
          </button>
        </div>
        
        <div className="error-footer">
          <p>
            <small>
              Support technique : <a href="mailto:support@entreprise.com">support@entreprise.com</a> 
              ou <a href="tel:+261123456789">+261 12 345 67 89</a>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;