# Corrections de correspondance entre le code et la base de données

## Problèmes identifiés et corrigés

### 1. Modèle EnvoiQcmCandidat (`envoiQcmCandidatsModel.js`)
**Problème :** Le modèle contenait un champ `id_employe` qui n'existe pas dans la table SQL
**Solution :** Supprimé le champ `id_employe` et ses références

**Avant :**
```javascript
id_employe: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: Employe,
    key: 'id_employe'
  }
}
```

**Après :**
```javascript
// Champ supprimé - n'existe pas dans la table SQL
```

### 2. Modèle QuestionQcm (`questionQcmsModel.js`)
**Problème :** La clé primaire utilisait `id_question_qcm` au lieu de `id_question`
**Solution :** Correction du nom du champ primaire

**Avant :**
```javascript
id_question_qcm: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
}
```

**Après :**
```javascript
id_question: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
}
```

### 3. Modèle ReponseQcm (`reponseQcmsModel.js`)
**Problème :** Référence incorrecte vers QuestionQcm avec `id_question_qcm`
**Solution :** Correction de la référence pour pointer vers `id_question`

**Avant :**
```javascript
references: {
  model: QuestionQcm,
  key: 'id_question_qcm'
}
```

**Après :**
```javascript
references: {
  model: 'question_qcms',
  key: 'id_question'
}
```

### 4. Modèle QcmAnnonce (`qcmAnnoncesModel.js`)
**Problème :** Référence incorrecte vers QuestionQcm
**Solution :** Correction de la référence

**Avant :**
```javascript
references: {
  model: 'question_qcms',
  key: 'id_question_qcm'
}
```

**Après :**
```javascript
references: {
  model: 'question_qcms',
  key: 'id_question'
}
```

### 5. Modèle ReponseQcmCandidat (`reponseQcmCandidatsModel.js`)
**Problème :** Champ `reponse` manquant dans le modèle
**Solution :** Ajout du champ `reponse` requis par la table SQL

**Ajouté :**
```javascript
reponse: {
  type: DataTypes.STRING,
  allowNull: false
}
```

### 6. Service EnvoiQcm (`envoiQcmService.js`)
**Problème :** Référence à un champ `intitule` inexistant sur le modèle Poste
**Solution :** Correction pour utiliser le champ `valeur`

**Avant :**
```javascript
attributes: ['intitule']
```

**Après :**
```javascript
attributes: ['valeur']
```

**Problème :** Référence à des champs inexistants dans QuestionQcm
**Solution :** Correction des références

**Avant :**
```javascript
id_question: qcmAnnonce.QuestionQcm.id_question_qcm,
question: qcmAnnonce.QuestionQcm.question,
type_question: qcmAnnonce.QuestionQcm.type_question,
```

**Après :**
```javascript
id_question: qcmAnnonce.QuestionQcm.id_question,
question: qcmAnnonce.QuestionQcm.intitule,
```

### 7. Conversion en associations lazy loading
**Problème :** Les modèles utilisaient des imports directs causant des dépendances circulaires
**Solution :** Conversion vers des associations lazy loading avec la fonction `associate`

**Exemple :**
```javascript
// Avant
const QuestionQcm = require('./questionQcmsModel');
ReponseQcm.belongsTo(QuestionQcm, { foreignKey: 'id_question_qcm' });

// Après
ReponseQcm.associate = function(models) {
  ReponseQcm.belongsTo(models.QuestionQcm, { foreignKey: 'id_question_qcm', targetKey: 'id_question' });
};
```

### 8. Modèle Poste (`postesModel.js`)
**Problème :** Contrainte `unique: true` sur le champ `valeur` qui peut causer des erreurs
**Solution :** Suppression de la contrainte unique non nécessaire

## Structure de la base de données respectée

### Tables principales corrigées :
- `question_qcms` : clé primaire `id_question`
- `reponse_qcms` : référence `id_question_qcm` vers `question_qcms.id_question`
- `qcm_annonces` : référence `id_question_qcm` vers `question_qcms.id_question`
- `envoi_qcm_candidats` : pas de champ `id_employe`
- `reponse_qcm_candidats` : champ `reponse` requis
- `postes` : champ `valeur` pour le nom du poste

### Champs corrigés dans les services :
- `Poste.valeur` au lieu de `Poste.intitule`
- `QuestionQcm.id_question` au lieu de `QuestionQcm.id_question_qcm`
- `QuestionQcm.intitule` au lieu de `QuestionQcm.question`

## Tests recommandés

1. Vérifier le chargement des modèles :
```bash
node -e "const { models } = require('./models/index'); console.log('Modèles:', Object.keys(models));"
```

2. Tester la création d'un candidat avec QCM
3. Vérifier la récupération des questions QCM par token
4. Tester l'envoi d'emails QCM

## Notes importantes

- Tous les modèles utilisent maintenant des associations lazy loading pour éviter les dépendances circulaires
- Les noms de champs correspondent exactement à ceux de la base de données PostgreSQL
- Les contraintes de clés étrangères sont correctement définies
- Les services utilisent les bons noms de champs lors des requêtes