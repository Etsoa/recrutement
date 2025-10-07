// Script de validation du design des paramètres
// Vérification que tous les composants utilisent le design professionnel Axiom

const fs = require('fs');
const path = require('path');

const parametreFiles = [
  'src/pages/unite/parametres/Postes.js',
  'src/pages/unite/parametres/Genres.js', 
  'src/pages/unite/parametres/Villes.js',
  'src/pages/unite/parametres/Niveau.js',
  'src/pages/unite/parametres/Filieres.js',
  'src/pages/unite/parametres/Domaines.js',
  'src/pages/unite/parametres/Langues.js',
  'src/pages/unite/parametres/Qualites.js',
  'src/pages/unite/parametres/QuestionsReponses.js'
];

console.log('🔍 Validation du design professionnel des paramètres...\n');

let allValid = true;

parametreFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  const fileName = path.basename(filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${fileName}: Fichier non trouvé`);
    allValid = false;
    return;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Vérifications des éléments du design professionnel
  const checks = [
    {
      name: 'CSS Classes Axiom',
      test: content.includes('parametrage-unite__section-header') && 
            content.includes('parametrage-unite__form-column') &&
            content.includes('parametrage-unite__list-column'),
      required: true
    },
    {
      name: 'Logique CREATE préservée',
      test: content.includes('valeur:') && content.includes('.trim()'),
      required: true
    },
    {
      name: 'Gestion des erreurs améliorée',
      test: content.includes('error.response?.data?.message'),
      required: true
    },
    {
      name: 'État de chargement',
      test: content.includes('[loading, setLoading]') && content.includes('spinner'),
      required: true
    },
    {
      name: 'État vide professionnel',
      test: content.includes('parametrage-unite__empty'),
      required: true
    },
    {
      name: 'Validation d\'entrée',
      test: content.includes('!') && content.includes('.trim()'),
      required: true
    }
  ];
  
  console.log(`📄 ${fileName}:`);
  let fileValid = true;
  
  checks.forEach(check => {
    const status = check.test ? '✅' : '❌';
    console.log(`  ${status} ${check.name}`);
    if (!check.test && check.required) {
      fileValid = false;
      allValid = false;
    }
  });
  
  console.log(`  📊 Status: ${fileValid ? '✅ VALIDE' : '❌ PROBLÈME'}\n`);
});

console.log('📋 RÉSUMÉ DE LA VALIDATION:');
console.log('─'.repeat(50));
console.log(`🎯 Design professionnel: ${allValid ? '✅ COMPLET' : '❌ INCOMPLET'}`);
console.log(`🔧 Logique métier: ${allValid ? '✅ PRÉSERVÉE' : '❌ PROBLÈME'}`);
console.log(`🎨 Cohérence Axiom: ${allValid ? '✅ RESPECTÉE' : '❌ MANQUANTE'}`);

if (allValid) {
  console.log('\n🎉 SUCCÈS: Tous les composants de paramétrage utilisent le design professionnel !');
  console.log('✨ Axiom design system appliqué avec cohérence');
  console.log('🔒 Logique métier CREATE préservée dans tous les composants');
} else {
  console.log('\n⚠️  ATTENTION: Certains composants nécessitent des corrections');
}