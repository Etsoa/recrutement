# Documentation du système d'affichage des annonces

## Composants créés

### 1. AnnonceCard
**Fichier :** `src/components/AnnonceCard.js`
**Utilisation :** Affiche une annonce avec toutes ses informations et un bouton de candidature

**Props :**
- `annonce` : Objet contenant les données de l'annonce
- `onPostuler` : Fonction callback appelée lors du clic sur le bouton de candidature

**Exemple d'utilisation :**
```jsx
<AnnonceCard 
  annonce={annonceData} 
  onPostuler={(annonce) => console.log('Candidature pour:', annonce)} 
/>
```

### 2. Page Annonces mise à jour
**Fichier :** `src/pages/Annonces.js`
**Fonctionnalités :**
- Chargement automatique des annonces depuis l'API
- Filtrage par nom de poste (recherche)
- Filtrage par ville (dropdown)
- États de chargement et d'erreur
- Interface responsive

## Services créés

### 1. Service API Annonces
**Fichier :** `src/services/annoncesService.js`
**Fonctions principales :**
- `getAllAnnonces()` : Récupère toutes les annonces actives
- `getAnnonceById(id)` : Récupère une annonce spécifique
- `createCandidature(data)` : Soumet une candidature
- `filterAnnonces()` : Filtre les annonces selon des critères
- `formatAnnonceForDisplay()` : Formate les données pour l'affichage

### 2. Extension du service API principal
**Fichier :** `src/services/api.js`
**Ajout de la section :** `api.annonces`

## Styles créés

### 1. AnnonceCard.css
- Design moderne avec effets hover
- Layout responsive
- Animations CSS
- Sections organisées pour les informations

### 2. AnnoncesPage.css
- Interface de liste complète
- Filtres intégrés
- États de chargement/erreur
- Design mobile-first

## Structure des données attendues

L'API doit retourner les annonces dans ce format :
```json
{
  "success": true,
  "data": [
    {
      "id_annonce": 1,
      "age_min": 25,
      "age_max": 35,
      "Poste": { "valeur": "Développeur Full-Stack" },
      "Ville": { "valeur": "Antananarivo" },
      "Genre": { "valeur": "Indifférent" },
      "ExperienceAnnonces": [
        {
          "nombre_annee": 2,
          "Domaine": { "valeur": "Développement web" }
        }
      ],
      "LangueAnnonces": [
        { "Langue": { "valeur": "Français" } }
      ],
      "QualiteAnnonces": [
        { "Qualite": { "valeur": "Autonome" } }
      ],
      "NiveauFiliereAnnonces": [
        {
          "Filiere": { "valeur": "Informatique" },
          "Niveau": { "valeur": "Licence" }
        }
      ]
    }
  ]
}
```

## Intégration

### Étapes pour utiliser le système :

1. **Démarrer le backend** avec les endpoints `/public/annonces`
2. **Configurer l'URL API** dans le fichier `.env` frontend
3. **Accéder à la page** `/annonces` dans l'application React
4. **Personnaliser la logique de candidature** dans la fonction `handlePostuler`

### Prochaines étapes recommandées :

1. Créer un formulaire de candidature complet
2. Implémenter la gestion des candidatures en BDD
3. Ajouter des filtres avancés (âge, expérience, etc.)
4. Créer un système de pagination pour de grandes listes
5. Ajouter des notifications de succès/erreur pour les candidatures

## Tests recommandés

1. **Test de chargement :** Vérifier que les annonces se chargent correctement
2. **Test de filtrage :** Vérifier le fonctionnement des filtres de recherche
3. **Test responsive :** Vérifier l'affichage sur mobile/tablette
4. **Test de candidature :** Vérifier le clic sur le bouton de candidature
5. **Test d'erreur :** Vérifier le comportement en cas d'erreur API

## Commandes pour tester

```bash
# Frontend
cd frontend
npm start

# Backend (dans un autre terminal)
cd backend
npm start

# Accéder à http://localhost:3000/annonces
```