const axios = require('axios');

/**
 * Middleware pour vérifier le token reCAPTCHA (optionnel)
 * Peut être utilisé pour une validation supplémentaire côté serveur
 */
const verifyRecaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;
    
    // Si pas de token fourni, continuer sans validation (optionnel)
    if (!recaptchaToken) {
      console.log('Aucun token reCAPTCHA fourni, continuation sans validation');
      return next();
    }
    
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.warn('RECAPTCHA_SECRET_KEY non configuré, validation sautée');
      return next();
    }
    
    // Vérification auprès de Google
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
    
    const response = await axios.post(verificationURL, null, {
      params: {
        secret: secretKey,
        response: recaptchaToken,
        remoteip: req.ip
      }
    });
    
    const { success, score, action } = response.data;
    
    if (!success) {
      return res.status(400).json({
        success: false,
        message: 'Échec de la vérification reCAPTCHA',
        error: 'RECAPTCHA_FAILED'
      });
    }
    
    // Pour reCAPTCHA v3, on peut vérifier le score (optionnel)
    if (score && score < 0.5) {
      return res.status(400).json({
        success: false,
        message: 'Score reCAPTCHA trop faible',
        error: 'RECAPTCHA_LOW_SCORE'
      });
    }
    
    console.log(`reCAPTCHA validé avec succès - Score: ${score || 'N/A'}`);
    next();
    
  } catch (error) {
    console.error('Erreur lors de la vérification reCAPTCHA:', error.message);
    
    // En cas d'erreur de validation, on peut choisir de continuer ou de bloquer
    // Ici, on continue pour éviter que les problèmes réseau bloquent les soumissions
    console.log('Continuation malgré l\'erreur de validation reCAPTCHA');
    next();
  }
};

module.exports = verifyRecaptcha;