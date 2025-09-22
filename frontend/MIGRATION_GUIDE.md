# Guide de Migration - Structure des Services

## Changements Effectués

### 1. **App.js - Nettoyage**
- Suppression de la duplication de code
- Conservation uniquement de la logique d'initialisation
- Le routage est maintenant délégué à `AppRouter`

### 2. **AppRouter.js - Centralisation du Routage**
- Toutes les routes sont maintenant dans `AppRouter.js`
- Routes publiques avec Layout
- Routes back-office sans Layout
- Configuration centralisée dans `routes.js`

### 3. **Services - Structure Unifiée**
Tous les appels backend sont maintenant dans des services :

#### Services Disponibles :
- **`annoncesService.js`** - Gestion des annonces publiques
- **`annoncesBackOfficeService.js`** - Gestion des annonces en back-office
- **`parametresService.js`** - Gestion des paramètres
- **`ficheCandidatService.js`** - Gestion des candidats
- **`userService.js`** - Gestion des utilisateurs
- **`unitesService.js`** - Gestion des unités et authentification

#### API Centralisée :
- **`api.js`** - Configuration commune pour tous les appels HTTP
- Gestion unifiée des erreurs
- Support des tokens d'authentification
- Méthodes GET, POST, PUT, PATCH, DELETE, UPLOAD

## Migration pour les Composants

### Avant (utilisation directe des API) :
```javascript
import { createAnnonce } from '../api/annonceApi';

const handleSubmit = async (data) => {
  try {
    const result = await createAnnonce(data);
    // ...
  } catch (error) {
    // ...
  }
};
```

### Après (utilisation des services) :
```javascript
import { annoncesBackOfficeService } from '../services';

const handleSubmit = async (data) => {
  try {
    const result = await annoncesBackOfficeService.createAnnonce(data);
    // ...
  } catch (error) {
    // ...
  }
};
```

## Routes Disponibles

### Routes Publiques :
- `/` - Home
- `/liste-annonces` - Liste des annonces
- `/details-annonce/:idAnnonce` - Détails d'une annonce
- `/fiche-candidat/:idCandidat` - Fiche candidat

### Routes Back-Office :
- `/back-office` - Connexion unités
- `/back-office/dashboard` - Tableau de bord
- `/back-office/parametres` - Paramètres
- `/back-office/createAnnonce` - Créer une annonce
- `/back-office/updateAnnonce` - Modifier une annonce
- `/back-office/createQCM/:id` - Créer un QCM
- `/back-office/listeAnnonce` - Liste des annonces BO
- `/back-office/detailQCM/:id` - Détails QCM
- `/back-office/historique` - Historique

## Prochaines Étapes

1. **Migrer les composants** qui utilisent encore les anciens fichiers API
2. **Supprimer les fichiers API** obsolètes (`annonceApi.js`, `parametreApi.js`, `unitesApi.js`, `userApi.js`)
3. **Tester toutes les fonctionnalités** pour s'assurer que la migration est complète

## Avantages de cette Structure

✅ **Séparation claire** des responsabilités
✅ **Gestion unifiée** des erreurs
✅ **Configuration centralisée** des appels HTTP
✅ **Routage organisé** et maintenable
✅ **Services réutilisables** dans toute l'application
✅ **Structure évolutive** et extensible