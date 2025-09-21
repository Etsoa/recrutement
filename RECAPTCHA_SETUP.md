# Configuration Google reCAPTCHA

## Aperçu
Ce projet intègre Google reCAPTCHA pour sécuriser le formulaire de candidature contre les soumissions automatisées et le spam.

## Configuration requise

### 1. Obtenir les clés reCAPTCHA

1. Allez sur https://www.google.com/recaptcha/admin/create
2. Créez un nouveau site reCAPTCHA
3. Choisissez le type reCAPTCHA v2 (Checkbox)
4. Ajoutez votre domaine (localhost pour le développement)
5. Obtenez la **Site Key** et la **Secret Key**

### 2. Configuration Frontend

Modifiez le fichier `frontend/.env` :

```env
# Google reCAPTCHA Configuration
REACT_APP_RECAPTCHA_SITE_KEY=VOTRE_SITE_KEY_ICI
```

### 3. Configuration Backend (Optionnel)

Modifiez le fichier `backend/.env` :

```env
# Configuration Google reCAPTCHA
RECAPTCHA_SECRET_KEY=VOTRE_SECRET_KEY_ICI
```

## Utilisation

### Clés de test
Pour les tests de développement, vous pouvez utiliser les clés de test de Google :
- **Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`  
- **Secret Key**: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

Ces clés acceptent toujours la validation sans vérification réelle.

### Composant Frontend
Le composant `Captcha.js` utilise `react-google-recaptcha` pour :
- Afficher le widget reCAPTCHA
- Gérer la validation côté client
- Fournir un token pour la vérification serveur

### Validation Backend (Optionnel)
Le middleware `recaptchaMiddleware.js` permet une validation côté serveur du token reCAPTCHA.

#### Utilisation du middleware :
```javascript
const verifyRecaptcha = require('./middleware/recaptchaMiddleware');

// Application sur une route spécifique
router.post('/candidature', verifyRecaptcha, (req, res) => {
  // Logique de traitement de la candidature
});
```

## États du reCAPTCHA

### Frontend
- **Non résolu** : Le widget attend l'interaction de l'utilisateur
- **Résolu** : L'utilisateur a validé le reCAPTCHA
- **Expiré** : Le token a expiré (2 minutes), nouveau captcha requis
- **Erreur** : Problème de réseau ou de configuration

### Gestion des erreurs
- Le composant affiche des messages d'erreur appropriés
- En cas d'expiration, l'utilisateur peut refaire le captcha
- Les erreurs réseau sont gérées gracieusement

## Sécurité

### Bonnes pratiques
1. **Jamais exposer la Secret Key** dans le frontend
2. **Utiliser HTTPS** en production
3. **Vérifier le token côté serveur** pour une sécurité maximale
4. **Configurer les domaines autorisés** dans la console reCAPTCHA

### Considérations
- Le token reCAPTCHA expire après 2 minutes
- Chaque token ne peut être utilisé qu'une seule fois
- La vérification côté serveur est optionnelle mais recommandée

## Développement vs Production

### Développement
- Utilisez les clés de test fournies
- Domaine : `localhost`
- Validation automatiquement acceptée

### Production
1. Créez un nouveau site reCAPTCHA pour votre domaine de production
2. Remplacez les clés de test par les vraies clés
3. Configurez le domaine de production
4. Activez la validation côté serveur

## Dépannage

### Erreurs courantes
- **"Invalid site key"** : Vérifiez la REACT_APP_RECAPTCHA_SITE_KEY
- **"Invalid domain"** : Ajoutez votre domaine dans la configuration reCAPTCHA
- **"Network error"** : Problème de connectivité ou clés incorrectes

### Debug
Le composant affiche des logs en console pour faciliter le debug :
- État du captcha
- Tokens générés
- Erreurs de validation

## Notes d'implémentation

### Fallback gracieux
- Si reCAPTCHA ne se charge pas, le formulaire reste utilisable
- Les erreurs de validation n'empêchent pas la soumission
- Messages d'erreur informatifs pour l'utilisateur

### Performance
- Le script reCAPTCHA est chargé de manière asynchrone
- Pas d'impact sur le temps de chargement initial
- Réutilisation du même widget pour plusieurs tentatives