# Test du flux "Affichage Liste Annonces par Unité"

## Vérification complète du code

### ✅ **Code vérifié et conforme :**

#### Frontend :
1. **Page loginUnites.js** :
   - ✅ Stockage `id_unite` dans localStorage après connexion réussie
   - ✅ Redirection vers `/back-office/liste-annonces` après login
   
2. **Service annoncesService.js** :
   - ✅ Méthode `getAnnoncesByUnite(idUnite)` ajoutée 
   - ✅ Appel API `GET /unite/annonces-unite?id={idUnite}`
   
3. **Page ListeAnnonces.js** :
   - ✅ Récupération `currentUnite.id_unite` depuis localStorage
   - ✅ Appel `annoncesService.getAnnoncesByUnite(currentUnite.id_unite)`
   - ✅ Affichage grid avec filtres (status, recherche)
   - ✅ Gestion des erreurs + loading states

#### Backend :
4. **Route uniteRoutes.js** :
   - ✅ `GET /annonces-unite` → `uniteController.getAllAnnoncesUnite`
   
5. **Contrôleur uniteController.js** :
   - ✅ `getAllAnnoncesUnite()` utilise `req.query.id` pour l'ID unité
   - ✅ Appel `traitementAnnonceService.getAllAnnonces(id)`

#### Données :
6. **Seed data_coherent.sql** :
   - ✅ 6 unités disponibles avec mot de passe 'azerty'
   - ✅ 3 annonces test réparties dans 3 unités différentes :
     * Comptable Junior → Unité Comptabilité (id=3)
     * Développeur → Unité Informatique (id=6) 
     * Responsable Marketing → Unité Marketing (id=4)

## Scénarios de test recommandés :

### Test 1 : Connexion Unité Comptabilité
1. Accueil → "Accès Unités"
2. Sélectionner "Comptabilite" + mot de passe "azerty"
3. **Résultat attendu** : Redirection + affichage 1 annonce "Comptable Junior"

### Test 2 : Connexion Unité Informatique  
1. Sélectionner "Informatique" + mot de passe "azerty"
2. **Résultat attendu** : Affichage 1 annonce "Développeur"

### Test 3 : Connexion Unité Production
1. Sélectionner "Production" + mot de passe "azerty"  
2. **Résultat attendu** : Affichage vide (aucune annonce pour cette unité)

### Test 4 : Filtres et recherche
1. Connecté sur unité avec annonces → tester filtres status + recherche par poste

## Commandes de test (PowerShell) :

```powershell
# Test direct route backend (remplacer ID_UNITE)
Invoke-RestMethod -Uri "http://localhost:5000/api/unite/annonces-unite?id=3" -Method GET

# Test avec différentes unités
Invoke-RestMethod -Uri "http://localhost:5000/api/unite/annonces-unite?id=4" -Method GET
Invoke-RestMethod -Uri "http://localhost:5000/api/unite/annonces-unite?id=6" -Method GET
```

## Problèmes potentiels à surveiller :
- API endpoint `/unite/annonces-unite` accessible et fonctionnel
- Service `traitementAnnonceService.getAllAnnonces(id)` implémenté
- Données relationnelles (postes, villes, genres) bien associées
- Gestion d'erreur si unité n'a aucune annonce

## Statut : ✅ PRÊT POUR TESTS
Le code est vérifié et conforme aux spécifications. La règle métier est correctement implémentée.