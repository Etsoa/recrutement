# Données de test pour les Annonces

## 🧪 Mode de fonctionnement

La page Annonces peut maintenant fonctionner avec des **données de test** pour faciliter le développement et les tests d'interface utilisateur, sans dépendre du backend.

## ⚙️ Configuration

Dans le fichier `src/pages/Annonces.js`, la constante `USE_TEST_DATA` contrôle le mode d'affichage :

```javascript
const USE_TEST_DATA = true; // Mode test activé
const USE_TEST_DATA = false; // Mode API réel
```

## 📊 Données de test incluses

Le système contient **5 annonces de test** avec des profils variés :

### 1. Développeur Full-Stack
- **Lieu :** Antananarivo
- **Âge :** 25-35 ans
- **Expériences :** Développement web (3 ans), Base de données (2 ans)
- **Langues :** Français, Anglais, JavaScript
- **Formation :** Informatique - Licence

### 2. Designer UI/UX
- **Lieu :** Fianarantsoa  
- **Âge :** 22-30 ans
- **Expériences :** Design graphique (2 ans)
- **Langues :** Français, Anglais
- **Formation :** Arts appliqués - Master

### 3. Responsable Marketing Digital
- **Lieu :** Antananarivo
- **Âge :** 24-40 ans
- **Expériences :** Marketing digital (5 ans), Réseaux sociaux (3 ans)
- **Langues :** Français, Anglais, Malagasy
- **Formation :** Marketing - Master, Communication - Licence

### 4. Ingénieur Système
- **Lieu :** Toamasina
- **Âge :** 26-35 ans
- **Expériences :** Administration système (4 ans), Sécurité informatique (2 ans)
- **Langues :** Français, Anglais
- **Formation :** Informatique - Master

### 5. Comptable
- **Lieu :** Mahajanga
- **Âge :** 23-32 ans
- **Expériences :** Comptabilité générale (3 ans)
- **Langues :** Français, Malagasy
- **Formation :** Gestion - Licence

## 🎯 Fonctionnalités testables

Avec ces données de test, vous pouvez tester :

### ✅ Filtres de recherche
- **Recherche par poste :** Tapez "Développeur", "Designer", "Marketing"...
- **Filtre par ville :** Sélectionnez Antananarivo, Fianarantsoa, Toamasina, Mahajanga

### ✅ Interface utilisateur
- Affichage des cartes d'annonces
- Boutons "Postuler maintenant"
- Responsive design sur différentes tailles d'écran
- États de chargement et messages informatifs

### ✅ Navigation
- Accès depuis le menu Header
- État actif du lien de navigation

## 🚀 Comment utiliser

### Mode test (développement)
```javascript
const USE_TEST_DATA = true;
```
- ✅ Données immédiatement disponibles
- ✅ Pas besoin du backend
- ✅ Interface testable rapidement
- ⚠️ Indicateur visuel affiché

### Mode production (API réelle)
```javascript
const USE_TEST_DATA = false;
```
- 🔄 Chargement depuis l'API backend
- 📡 Requête vers `/public/annonces`
- ⚠️ Nécessite le backend en fonctionnement

## 🎨 Indicateur visuel

Quand le mode test est activé, un bandeau jaune s'affiche en haut de la page :

> ⚠️ **Mode test :** Affichage de données de test. Changez `USE_TEST_DATA = false` pour utiliser l'API réelle.

## 💡 Avantages du système

1. **Développement rapide** : Interface testable sans backend
2. **Débogage facile** : Données prévisibles et contrôlées
3. **Démonstration** : Présentation de l'interface avec du contenu réaliste
4. **Flexibilité** : Basculement simple entre test et production

## 🔧 Prochaines étapes

1. **Tester l'interface** avec les données de test
2. **Ajuster les styles** si nécessaire
3. **Connecter au backend** quand il sera prêt
4. **Ajouter plus de données de test** si souhaité