import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from './Button';
import '../styles/Captcha.css';

const Captcha = ({ onVerify, onCancel }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef(null);

  // Site key pour reCAPTCHA (sera configuré via les variables d'environnement)
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key par défaut

  // Callback quand reCAPTCHA est résolu
  const handleRecaptchaChange = (token) => {
    if (token) {
      setIsVerified(true);
      setError('');
    } else {
      setIsVerified(false);
    }
  };

  // Callback en cas d'expiration du token
  const handleRecaptchaExpired = () => {
    setIsVerified(false);
    setError('Le captcha a expiré. Veuillez le refaire.');
  };

  // Callback en cas d'erreur de chargement
  const handleRecaptchaError = () => {
    setIsVerified(false);
    setError('Erreur de chargement du captcha. Veuillez réessayer.');
  };

  // Vérifier et envoyer
  const handleVerify = async () => {
    if (!isVerified) {
      setError('Veuillez compléter la vérification reCAPTCHA.');
      return;
    }

    try {
      const token = recaptchaRef.current.getValue();
      
      // Optionnel : Vérifier le token côté serveur
      // const response = await fetch('/api/verify-recaptcha', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token })
      // });
      
      // Pour l'instant, on fait confiance au token côté client
      onVerify(true);
    } catch (error) {
      console.error('Erreur lors de la vérification du captcha:', error);
      setError('Erreur lors de la vérification. Veuillez réessayer.');
    }
  };

  return (
    <div className="captcha-overlay">
      <div className="captcha-modal">
        <div className="captcha-header">
          <h3>Vérification de sécurité</h3>
          <p>Veuillez compléter la vérification anti-robot pour confirmer votre candidature</p>
        </div>

        <div className="captcha-content">
          <div className="recaptcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              onExpired={handleRecaptchaExpired}
              onError={handleRecaptchaError}
              theme="light"
              size="normal"
            />
          </div>

          {error && <div className="captcha-error">{error}</div>}
        </div>

        <div className="captcha-actions">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={handleVerify}
            disabled={!isVerified}
          >
            Vérifier et envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Captcha;