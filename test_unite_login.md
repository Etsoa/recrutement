# Test du flux d'accès aux unités

## Étapes à vérifier :

### 1. Page d'accueil (Home.js)
- [ ] Le bouton "Accès Unités" est affiché
- [ ] Le clic sur le bouton redirige vers `/login-unites`

### 2. Page login unités (loginUnites.js)
- [ ] La liste des unités se charge correctement (`useEffect` appelle `unitesService.getAllUnites()`)
- [ ] Le select affiche toutes les unités avec leurs noms
- [ ] Le champ mot de passe est présent avec toggle afficher/masquer
- [ ] Les unités disponibles :
  - Direction Generale (mot de passe : azerty)
  - Ressources Humaines (mot de passe : azerty)
  - Comptabilite (mot de passe : azerty)
  - Marketing (mot de passe : azerty)
  - Production (mot de passe : azerty)
  - Informatique (mot de passe : azerty)

### 3. Routes backend testées
- [ ] `GET /unite/` retourne la liste des unités
- [ ] `POST /unite/login` avec `{ username: "Direction Generale", password: "azerty" }` réussit
- [ ] `POST /unite/login` avec un mauvais mot de passe échoue

### 4. Session et redirection
- [ ] Connexion réussie stocke dans localStorage : `token`, `unite`, `id_unite`, `uniteSession`
- [ ] Redirection vers `/back-office/liste-annonces`

## Commandes de test (PowerShell) :

### Tester backend manuellement :
```powershell
# Récupérer liste des unités
Invoke-RestMethod -Uri "http://localhost:3001/api/unite/" -Method GET

# Tester login
$body = @{
    username = "Direction Generale"
    password = "azerty"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/unite/login" -Method POST -Body $body -ContentType "application/json"
```

## Problèmes potentiels identifiés :

1. **Base de données** : Vérifier que les tables `unites` sont créées et peuplées
2. **CORS** : S'assurer que le frontend peut appeler le backend
3. **Variables d'environnement** : `REACT_APP_API_URL` doit pointer vers le backend
4. **Routes** : Vérifier que `/api/unite/` et `/api/unite/login` sont bien configurées

## Documentation règle métier ajoutée :
✅ Flux technique détaillé dans `Features.md` section LOGIN avec routes backend