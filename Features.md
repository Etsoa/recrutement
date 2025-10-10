# Features et Règles de Gestion - Application Axiom

## 📋 UNITÉS :

### 🔐 LOGIN :
- **RG-U01** : Chaque unité a un nom unique et un mot de passe
- **RG-U02** : Connexion avec nom d'unité + mot de passe (table `unites`)
- **RG-U03** : Session utilisateur maintenue côté client

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
