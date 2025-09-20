import React from 'react';

const SuccessMessage = ({ annonce, onBackToAnnonces }) => {
  return (
    <div className="success-message-container">
      <div className="success-card">
        <div className="success-icon">
          ✓
        </div>
        
        <h2>Candidature envoyée avec succès !</h2>
        
        <p className="success-description">
          Votre candidature pour le poste de <strong>{annonce?.Poste?.valeur}</strong> 
          a été transmise avec succès à l'équipe de recrutement.
        </p>
        
        <div className="success-details">
          <h3>Prochaines étapes :</h3>
          <ul>
            <li>Vous recevrez un email de confirmation dans les prochaines minutes</li>
            <li>Notre équipe RH examinera votre candidature</li>
            <li>Vous serez contacté(e) sous 48-72h si votre profil correspond</li>
            <li>Un QCM pourrait vous être envoyé selon le poste</li>
          </ul>
        </div>
        
        <div className="success-actions">
          <button 
            className="btn-primary"
            onClick={onBackToAnnonces}
          >
            Retour aux annonces
          </button>
          <button 
            className="btn-secondary"
            onClick={() => window.print()}
          >
            Imprimer le récapitulatif
          </button>
        </div>
        
        <div className="success-footer">
          <p>
            <small>
              En cas de questions, contactez-nous à <a href="mailto:rh@entreprise.com">rh@entreprise.com</a>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;