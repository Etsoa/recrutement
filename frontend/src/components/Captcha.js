import React, { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from './Button';
import '../styles/Captcha.css';

const Captcha = ({ onVerify, onCancel }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const recaptchaRef = useRef(null);

  // Site key pour reCAPTCHA (sera configuré via les variables d'environnement)
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key par défaut

  // Timeout pour le chargement du reCAPTCHA
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setError('Le service de sécurité met du temps à se charger. Veuillez patienter ou actualiser la page.');
        setIsLoading(false);
      }
    }, 10000); // 10 secondes

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Callback quand reCAPTCHA est résolu
  const handleRecaptchaChange = (token) => {
    if (token) {
      setIsVerified(true);
      setError('');
      setIsLoading(false);
      console.log('reCAPTCHA vérifié avec succès');
    } else {
      setIsVerified(false);
    }
  };

  // Callback en cas d'expiration du token
  const handleRecaptchaExpired = () => {
    console.log('reCAPTCHA expiré');
    setIsVerified(false);
    setError('Le captcha a expiré. Veuillez le refaire.');
  };

  // Callback en cas d'erreur de chargement
  const handleRecaptchaError = (error) => {
    console.error('Erreur reCAPTCHA:', error);
    setIsVerified(false);
    setIsLoading(false);
    
    // Messages d'erreur plus spécifiques
    if (error === 'network-error') {
      setError('Problème de connexion réseau. Vérifiez votre connexion internet.');
    } else if (error === 'timeout') {
      setError('Le captcha a expiré. Veuillez le refaire.');
    } else {
      setError('Erreur de chargement du captcha. Veuillez actualiser la page.');
    }
  };

  // Callback quand reCAPTCHA se charge
  const handleRecaptchaLoad = () => {
    console.log('reCAPTCHA chargé avec succès');
    setIsLoading(false);
    setError('');
  };

  // Callback en cas d'erreur fatale
  const handleRecaptchaErrored = () => {
    console.error('Erreur fatale reCAPTCHA');
    setIsLoading(false);
    setError('Service de sécurité indisponible. Veuillez actualiser la page et réessayer.');
  };

  // Vérifier et envoyer
  const handleVerify = async () => {
    if (!isVerified) {
      setError('Veuillez compléter la vérification reCAPTCHA.');
      return;
    }

    try {
      const token = recaptchaRef.current.getValue();
      
      if (!token) {
        setError('Token reCAPTCHA invalide. Veuillez réessayer.');
        return;
      }
      
      // Réinitialiser les erreurs
      setError('');
      
      // Passer le token à la fonction de callback
      onVerify(token);
    } catch (error) {
      console.error('Erreur lors de la vérification du captcha:', error);
      
      // Gestion spécifique des erreurs de timeout
      if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
        setError('Timeout lors de la vérification. Veuillez réessayer.');
      } else if (error.message.includes('network')) {
        setError('Problème de connexion réseau. Vérifiez votre connexion internet.');
      } else {
        setError('Erreur lors de la vérification. Veuillez réessayer.');
      }
      
      // Réinitialiser le captcha en cas d'erreur
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setIsVerified(false);
      }
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
            {isLoading && (
              <div className="recaptcha-loading">
                <p>Chargement du service de sécurité...</p>
              </div>
            )}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              onExpired={handleRecaptchaExpired}
              onError={handleRecaptchaError}
              theme="light"
              size="normal"
              hl="fr"
              onLoad={handleRecaptchaLoad}
              onErrored={handleRecaptchaErrored}
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