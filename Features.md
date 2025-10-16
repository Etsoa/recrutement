# Features et Règles de Gestion - Application Axiom

## 📋 UNITÉS :

### 🔐 LOGIN :
- **RG-U01** : Chaque unité a un nom unique et un mot de passe
- **RG-U02** : Connexion avec nom d'unité + mot de passe (table `unites`)
- **RG-U03** : Session utilisateur maintenue côté client

#### Flux technique d'accès aux unités :
1. **Page d'accueil** : Bouton "Accès Unités" (`Home.js`) → Navigation vers `/login-unites`
2. **Récupération liste unités** : Appel API `GET /unite/` → `uniteController.getAllUnites()` → `unitesService.getAllUnites()` → `Unite.findAll()`
3. **Affichage unités** : Select avec toutes les unités (nom + id_unite) + champ mot de passe
4. **Connexion** : Appel API `POST /unite/login` → `uniteController.loginUnite()` → `unitesService.getUniteByCredentials(nom, mot_de_passe)`
5. **Authentification** : Recherche `Unite.findOne({ where: { nom: username, mot_de_passe: password } })`
6. **Session** : Stockage localStorage (`token`, `unite`, `id_unite`, `uniteSession`) + redirection vers `/back-office/liste-annonces`

**Route backend login unités :** `GET /unite/` (récupération liste) + `POST /unite/login` (authentification)

#### État des tests et debug :
- ✅ **Configuration réseau** : Frontend (.env) → `http://localhost:5000/api` / Backend (server.js) → Port 5000
- ✅ **Modèle données** : `unitesModel.js` conforme à `table.sql` (id_unite, nom, mot_de_passe)
- ✅ **Données seed** : 6 unités dans `data_coherent.sql` avec mot de passe 'azerty'
- ✅ **Services backend** : `getAllUnites()` → `Unite.findAll()` / `getUniteByCredentials()` → `Unite.findOne()`
- ✅ **Frontend logique** : Select peuplé via `unitesService.getAllUnites()`, formulaire de connexion, session localStorage
- ⚠️ **Tests requis** : Vérifier DB peuplée, CORS, connexion end-to-end (voir `test_unite_login.md`)

### 📋 LISTE ANNONCES PAR UNITÉ :
- **RG-U04** : Après connexion réussie, redirection automatique vers `/back-office/liste-annonces`
- **RG-U05** : Affichage des annonces filtrées par l'unité connectée (utilise `id_unite` stocké)
- **RG-U06** : Interface avec filtres (status, recherche) + bouton création d'annonce

#### Flux technique liste annonces :
1. **Redirection post-login** : `loginUnites.js` → `navigate('/back-office/liste-annonces')` après connexion réussie
2. **Récupération ID unité** : `unitesService.getCurrentUnite().id_unite` depuis localStorage
3. **Appel API annonces** : `annoncesService.getAnnoncesByUnite(id_unite)` → `GET /unite/annonces-unite?id={id_unite}`
4. **Backend traitement** : `uniteController.getAllAnnoncesUnite()` → `traitementAnnonceService.getAllAnnonces(id)` 
5. **Affichage** : Grid avec cartes d'annonces (poste, genre, ville, âge) + bouton détails

**Route backend liste annonces :** `GET /unite/annonces-unite` (paramètre `id` = id_unite)

#### État des tests et debug :
- ✅ **Service frontend** : `annoncesService.getAnnoncesByUnite()` ajoutée, utilise query params `?id={id_unite}`
- ✅ **Route backend** : `GET /unite/annonces-unite` → `req.query.id` pour filtrer par unité
- ✅ **Stockage session** : `id_unite` disponible dans localStorage après login
- ✅ **Page ListeAnnonces** : Logic de récupération + affichage + filtres opérationnels
- ✅ **Fix endpoint** : Correction `ANNONCES_ENDPOINTS.LIST` de `/unite/annonces` → `/unite/annonces-unite`
- ⚠️ **Backend requis** : S'assurer que le serveur backend tourne sur `http://localhost:5000`
- ⚠️ **Tests requis** : Vérifier données annonces en DB + affichage end-to-end

#### Problème résolu - Loading infini :
**Cause** : Endpoint incorrect dans `annoncesService.js` (`/unite/annonces` au lieu de `/unite/annonces-unite`)
**Solution** : Correction de `ANNONCES_ENDPOINTS.LIST` pour correspondre à la route backend
**Vérification** : Le backend doit être lancé (`npm start` dans `backend/`) sur port 5000

### 📝 CRÉATION D'ANNONCE :
- **RG-U07** : Une unité peut créer une annonce pour un poste de son unité
- **RG-U08** : À la création, le statut initial est automatiquement "Soumise par unité" (id_type_status_annonce = 1)
- **RG-U09** : L'ID de l'unité créatrice doit être enregistré dans status_annonces

#### Problème résolu - Création annonce (id_unite null) :
**Cause** : `id_unite` n'était pas passé dans `req.body` lors de la création d'annonce
**Solution** : 
1. **Contrôleur** : Récupération de `id_unite` depuis `req.body`, `req.user` ou `req.query` avec validation
2. **Service** : Validation que `id_unite` est présent avant création + erreur explicite si manquant
**Impact** : Les annonces créées incluent maintenant correctement l'ID de l'unité dans le statut initial

### 📢 GESTION DES ANNONCES :
- **RG-U04** : Une unité peut créer des annonces pour ses postes uniquement
- **RG-U05** : Une annonce comprend : poste, ville, âge min/max, genre, unité
- **RG-U06** : Cycle de vie d'une annonce : "En cours de demande" → "Publié" / "Non publié" / "Refusé" / "Modifié"
- **RG-U07** : Une annonce doit avoir au moins 1 langue, 1 qualité, 1 niveau/filière, 1 expérience requise
- **RG-U08** : Chaque annonce peut avoir plusieurs questions QCM associées

### 👥 GESTION DES CANDIDATS :
- **RG-U09** : Un candidat (tiers) peut postuler à plusieurs annonces
- **RG-U10** : Chaque candidature nécessite un CV au format PDF
- **RG-U11** : Analyse automatique de correspondance candidat/annonce basée sur :
  - Langues (intersection candidat ∩ annonce)
  - Qualités (intersection candidat ∩ annonce)  
  - Formation (niveau + filière)
  - Expérience (domaine + années)

### 📝 GESTION QCM :
- **RG-U12** : QCM envoyé automatiquement aux candidats avec token unique
- **RG-U13** : Score minimum QCM requis (configurable, défaut 15/20)
- **RG-U14** : Candidat doit rester sur la page durant le QCM (déconnexion = score 0)

### 🤝 ENTRETIENS UNITÉ :
- **RG-U15** : Entretien unité si QCM validé (score ≥ minimum)
- **RG-U16** : Calendrier des entretiens avec créneaux horaires définis
- **RG-U17** : Gestion des conflits de planning (pas 2 entretiens simultanés)
- **RG-U18** : Score entretien unité sur 20 points
- **RG-U19** : Score minimum entretien requis (configurable, défaut 10/20)

### 💡 SUGGESTIONS RH :
- **RG-U20** : Suggestion possible vers RH si entretien unité validé (score ≥ minimum)
- **RG-U21** : Suivi des suggestions envoyées à la RH
- **RG-U22** : Statuts : "En attente de validation", "Validé", "Invalidé"

### 📊 STATISTIQUES UNITÉ :
- **RG-U23** : Statistiques candidats par âge, genre, ville
- **RG-U24** : Statistiques annonces (créées, publiées, refusées)
- **RG-U25** : Tableau de bord avec KPI de recrutement

---

## 👔 RH :

### 🔐 LOGIN :
- **RG-R01** : Compte RH unique avec email et mot de passe
- **RG-R02** : Accès à toutes les fonctionnalités RH du système

### 📋 GESTION SUGGESTIONS UNITÉS :
- **RG-R03** : Réception des suggestions d'entretien des unités
- **RG-R04** : Validation/Invalidation des suggestions avec motif
- **RG-R05** : Planning automatique entretien RH si suggestion validée

### 🤝 ENTRETIENS RH :
- **RG-R06** : Calendrier RH avec créneaux horaires ouverts/fermés
- **RG-R07** : Jours fériés exclus automatiquement des plannings
- **RG-R08** : Délai minimum entre suggestion et entretien (configurable, défaut 2 jours)
- **RG-R09** : Score entretien RH sur 20 points
- **RG-R10** : Score minimum pour suggestion CEO (≥15/20)

### 🎯 SUGGESTIONS CEO :
- **RG-R11** : Suggestion automatique vers CEO si score RH ≥ 15/20
- **RG-R12** : Suivi des suggestions envoyées au CEO
- **RG-R13** : Historique des décisions CEO sur les candidats

### 📊 STATISTIQUES RH :
- **RG-R14** : Dashboard global de tous les candidats système
- **RG-R15** : Métriques de performance entretiens RH
- **RG-R16** : Suivi conversion suggestions → embauches

---

## 🏢 CEO :

### 🔐 LOGIN :
- **RG-C01** : Compte CEO unique avec authentification sécurisée
- **RG-C02** : Accès aux fonctions de direction

### 👥 GESTION EMPLOYÉS :
- **RG-C03** : Vue complète de tous les employés actifs/inactifs
- **RG-C04** : Statuts employés : Actif, Démission, Renvoi, Retraite, Décès
- **RG-C05** : Historique des changements de postes des employés
- **RG-C06** : Gestion des contrats d'essai (date début + durée)

### ✅ VALIDATION CANDIDATS :
- **RG-C07** : Validation finale des suggestions RH
- **RG-C08** : Statuts décision : "Validé", "Invalidé", "En attente"
- **RG-C09** : Commentaires obligatoires en cas de refus
- **RG-C10** : Embauche automatique si validé par CEO

### 📈 TABLEAU DE BORD CEO :
- **RG-C11** : KPI globaux entreprise (employés, recrutements, contrats)
- **RG-C12** : Suivi performance processus recrutement
- **RG-C13** : Alertes contrats d'essai arrivant à échéance

---

## ⚙️ RÈGLES MÉTIER TRANSVERSALES :

### 🕒 TEMPORALITÉ :
- **RG-T01** : Délai QCM : 2 jours max entre candidature et envoi
- **RG-T02** : Délai entretien unité : 2 jours max après QCM validé  
- **RG-T03** : Délai entretien RH : 2 jours max après suggestion validée
- **RG-T04** : Horaires ouvrés : 8h-12h et 13h-16h du lundi au vendredi

### 📊 SCORING :
- **RG-T05** : Score QCM minimum : 15/20 (configurable)
- **RG-T06** : Score entretien unité minimum : 10/20 (configurable)
- **RG-T07** : Score entretien RH minimum : 15/20 (configurable)
- **RG-T08** : Pourcentage minimum CV : 75% (configurable)

### 📧 NOTIFICATIONS :
- **RG-T09** : Email automatique envoi QCM avec token
- **RG-T10** : Email confirmation entretien unité si QCM validé
- **RG-T11** : Notifications changements de statut en temps réel
- **RG-T12** : Templates emails personnalisables (objet + corps + signature)

### 🔄 WORKFLOW RECRUTEMENT :
```
Candidature → QCM → Entretien Unité → Suggestion RH → Entretien RH → Suggestion CEO → Décision Finale → Embauche
```

---

## 🎯 PRÊT POUR VALIDATION
Je suis maintenant prêt à discuter feature par feature et à appliquer vos règles spécifiques ! 

Quelle feature souhaitez-vous que nous détaillions en premier ?
