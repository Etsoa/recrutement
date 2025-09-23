# DUPLICATION SYSTÈME RH → UNITE - CALENDRIER & ENTRETIENS

## 📋 RÉSUMÉ COMPLET DES DUPLICATION RÉALISÉES

### ✅ 1. FRONTEND - PAGE CALENDRIER
**Source:** `RhCalendrier.js` → **Cible:** `UniteCalendrier.js`

**Fonctionnalités dupliquées :**
- ✅ Calendrier mensuel avec navigation (précédent/suivant)
- ✅ Sélecteurs mois/année
- ✅ Affichage des entretiens par jour (badges avec compteurs)
- ✅ Modal de détails du jour sélectionné
- ✅ Liste des entretiens avec informations complètes
- ✅ Saisie et enregistrement de scores (0-20)
- ✅ Bouton "Suggérer à la RH" (équivalent de "Suggérer au CEO")
- ✅ Gestion des statuts d'entretien
- ✅ Affichage des derniers scores
- ✅ Interface identique avec mêmes styles CSS

**Différences adaptées :**
- Titre: "Calendrier Unité" au lieu de "Calendrier RH"
- API: `unitesService` au lieu de `rhService`
- Tables: `unite_entretiens` au lieu de `rh_entretiens`
- ID: `id_unite_entretien` au lieu de `id_rh_entretien`
- Suggestion: vers RH au lieu de vers CEO

### ✅ 2. FRONTEND - SERVICE API
**Source:** `rhService.js` → **Cible:** `unitesService.js`

**Endpoints dupliqués :**
- ✅ `getEntretiensParJour(date)` - Récupère entretiens d'un jour
- ✅ `getEntretiensParMois(start, end)` - Récupère entretiens d'un mois
- ✅ `updateStatusUniteEntretien(id, status)` - Met à jour statut
- ✅ `createScoreUniteEntretien(data)` - Crée un score
- ✅ `suggestToRh(data)` - Suggère candidat à RH

**Compatibilité :**
- ✅ Mêmes signatures de méthodes que RH
- ✅ Gestion des paramètres identique
- ✅ Réponses JSON harmonisées

### ✅ 3. BACKEND - CONTRÔLEUR
**Source:** `rhController.js` → **Cible:** `uniteController.js`

**Méthodes dupliquées :**
- ✅ `getAllUniteEntretiensParJour` - Liste entretiens par jour
- ✅ `getEntretiensParMois` - Liste entretiens par mois  
- ✅ `updateStatusUniteEntretien` - Mise à jour statut entretien
- ✅ `createScoreUniteEntretien` - Création score entretien
- ✅ `suggestToRh` - Suggestion vers RH
- ✅ `getAllRhSuggestions` - Liste suggestions envoyées

**Logique métier :**
- ✅ Validation des paramètres identique
- ✅ Gestion d'erreurs harmonisée
- ✅ Réponses JSON standardisées

### ✅ 4. BACKEND - SERVICE MÉTIER
**Source:** `rhService.js` → **Cible:** `unitesService.js`

**Fonctionnalités core dupliquées :**
- ✅ `getEntretiensParJour(day, id_unite)` - Requêtes par jour avec filtrage
- ✅ `getEntretiensParMois(start, end, id_unite)` - Requêtes par mois
- ✅ `updateStatusUniteEntretien(id, status)` - Gestion des statuts
- ✅ `createScoreUniteEntretien(data)` - Création scores avec validation
- ✅ `suggestToRh(data)` - Logique de suggestion

**Modèles utilisés :**
- ✅ `UniteEntretiensView` (équivalent `RhEntretiensView`)
- ✅ `StatusUniteEntretiens` (équivalent `StatusRhEntretiens`)
- ✅ `ScoreUniteEntretiens` (équivalent `ScoreRhEntretiens`)
- ✅ `RhSuggestions` (table de suggestions vers RH)

### ✅ 5. BACKEND - ROUTES API
**Source:** `rhRoutes.js` → **Cible:** `uniteRoutes.js`

**Routes dupliquées :**
```javascript
// RH                                    // UNITE
GET  /rh/rh_entretiens_jour         →   GET  /unite/unite_entretiens_jour
GET  /rh/rh_entretiens_mois         →   GET  /unite/entretiens_mois
POST /rh/update/status/rh_entretien →   POST /unite/update/status/unite_entretien
POST /rh/create/score/rh_entretien  →   POST /unite/create/score/unite_entretien
POST /rh/suggest/ceo                →   POST /unite/suggest/rh
GET  /rh/suggest/                   →   GET  /unite/suggest
```

### ✅ 6. PAGE SUGGESTIONS
**Source:** `RhCeoSuggestions.js` → **Cible:** `UniteRhSuggestions.js`

**Fonctionnalités :**
- ✅ Liste des suggestions envoyées à la RH
- ✅ Filtrage par statut (En attente, Validé, Refusé)
- ✅ Affichage détaillé des candidats
- ✅ Statistiques des suggestions
- ✅ Suivi de l'évolution des suggestions

---

## 🎯 CORRESPONDANCE FONCTIONNELLE EXACTE

### Calendrier des entretiens
| RH | UNITE |
|---|---|
| Calendrier RH entretiens | Calendrier Unité entretiens |
| Entretiens par jour/mois | Entretiens par jour/mois |
| Modal détails jour | Modal détails jour |
| Badges compteurs | Badges compteurs |

### Gestion entretiens  
| RH | UNITE |
|---|---|
| Update status RH entretien | Update status Unite entretien |
| Score RH entretien (0-20) | Score Unite entretien (0-20) |
| Date entretien RH | Date entretien Unite |

### Système de suggestions
| RH | UNITE |
|---|---|
| Suggérer au CEO | Suggérer à la RH |
| Liste suggestions CEO | Liste suggestions RH |
| Statuts validation CEO | Statuts validation RH |

---

## 📊 STRUCTURE DES TABLES

### Tables Unite (nouvelles/adaptées)
- ✅ `unite_entretiens` - Entretiens unité
- ✅ `status_unite_entretiens` - Statuts entretiens unité  
- ✅ `score_unite_entretiens` - Scores entretiens unité
- ✅ `rh_suggestions` - Suggestions unité → RH (réutilise table existante)

### Vues utilisées
- ✅ `unite_entretiens_view` - Vue complète entretiens unité
- ✅ Jointures avec `candidats`, `tiers`, `unites`, etc.

---

## 🚀 FONCTIONNALITÉS OPÉRATIONNELLES

### Côté Unite (utilisateur Unité)
1. ✅ Consulter calendrier des entretiens unité
2. ✅ Voir détails entretiens par jour
3. ✅ Marquer entretiens comme terminés
4. ✅ Attribuer scores aux candidats (0-20)
5. ✅ Suggérer candidats éligibles (score ≥ 10) à la RH
6. ✅ Suivre statut des suggestions envoyées à RH

### Côté RH (utilisateur RH)
1. ✅ Recevoir suggestions des unités dans leur système
2. ✅ Valider/refuser suggestions unité
3. ✅ Planifier entretiens RH pour candidats validés
4. ✅ Suggérer au CEO après entretien RH

---

## 🔄 FLUX COMPLET DE PROCESSUS

### Étape 1: Entretien Unité
1. Candidat passe entretien avec unité
2. Unité attribue score (0-20)
3. Si score ≥ 10 → Éligible pour suggestion RH

### Étape 2: Suggestion à RH  
1. Unité suggère candidat à RH via calendrier
2. Suggestion créée dans `rh_suggestions`
3. Statut initial: "En attente de validation"

### Étape 3: Traitement RH
1. RH consulte suggestions reçues
2. RH valide/refuse suggestion
3. Si validé → RH planifie entretien RH

### Étape 4: Entretien RH
1. Candidat passe entretien RH
2. RH attribue score entretien RH
3. Si excellent score → RH suggère au CEO

---

## ✨ ÉTAT ACTUEL : 100% DUPLIQUÉ

**✅ FRONTEND :** Pages, services, composants
**✅ BACKEND :** Contrôleurs, services, routes  
**✅ BASE DE DONNÉES :** Tables, vues, relations
**✅ LOGIQUE MÉTIER :** Validation, suggestions, scores
**✅ UI/UX :** Interface identique au système RH

Le système Unite duplique maintenant **EXACTEMENT** les fonctionnalités du système RH pour :
- 📅 Calendrier des entretiens  
- 📊 Gestion des scores
- 📤 Suggestions vers niveau supérieur
- 📋 Suivi des suggestions

**Prêt pour tests et utilisation !** 🎉