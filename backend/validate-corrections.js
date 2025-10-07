// Script de validation des corrections backend
// Vérification des erreurs corrigées dans le backend

const fs = require('fs');
const path = require('path');

console.log('🔧 Validation des corrections backend...\n');

const corrections = [
  {
    file: 'controllers/statController.js',
    check: 'Correction id_unite scope',
    search: 'const uniteId = req.body?.id_unite',
    description: 'Variable id_unite sécurisée dans catch block'
  },
  {
    file: 'services/unitesService.js', 
    check: 'Correction alias Sequelize',
    search: "as: 'Candidat'",
    description: 'Alias candidat->Candidat corrigé'
  },
  {
    file: 'services/unite/viewCandidatsService.js',
    check: 'Correction calcul âge SQL',
    search: 'EXTRACT(YEAR FROM AGE(t.date_naissance))',
    description: 'Colonne c.age remplacée par calcul correct'
  },
  {
    file: 'models/viewCandidatsModel.js',
    check: 'Correction nom de vue',
    search: "tableName: 'v_candidats'",
    description: 'Table v_candidats configurée'
  },
  {
    file: 'controllers/uniteController.js',
    check: 'Sérialisation Sequelize',
    search: 'q.toJSON ? q.toJSON() : q',
    description: 'Objects Sequelize sérialisés en JSON'
  }
];

let allCorrect = true;

corrections.forEach(correction => {
  const filePath = path.join(__dirname, '..', correction.file);
  const fileName = path.basename(correction.file);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${fileName}: Fichier non trouvé`);
      allCorrect = false;
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const hasCorrection = content.includes(correction.search);
    
    const status = hasCorrection ? '✅' : '❌';
    console.log(`${status} ${correction.check}`);
    console.log(`   📁 ${fileName}`);
    console.log(`   📝 ${correction.description}`);
    
    if (!hasCorrection) {
      allCorrect = false;
    }
    
    console.log('');
  } catch (error) {
    console.log(`❌ ${fileName}: Erreur lecture - ${error.message}`);
    allCorrect = false;
  }
});

console.log('📋 RÉSUMÉ DES CORRECTIONS:');
console.log('─'.repeat(50));

const errorTypes = [
  { 
    name: '🔧 Erreur id_unite scope', 
    status: allCorrect ? '✅ CORRIGÉE' : '❌ EN COURS',
    desc: 'Variable accessible dans catch block'
  },
  { 
    name: '🔧 Erreur alias Sequelize', 
    status: allCorrect ? '✅ CORRIGÉE' : '❌ EN COURS',
    desc: 'Alias candidat->Candidat harmonisé'
  },
  { 
    name: '🔧 Erreur colonne c.age', 
    status: allCorrect ? '✅ CORRIGÉE' : '❌ EN COURS',
    desc: 'Calcul âge depuis date_naissance'
  },
  { 
    name: '🔧 Erreur vue v_candidats', 
    status: allCorrect ? '✅ CORRIGÉE' : '❌ EN COURS',
    desc: 'Vue créée/référencée correctement'
  },
  { 
    name: '🔧 Erreur sérialisation', 
    status: allCorrect ? '✅ CORRIGÉE' : '❌ EN COURS',
    desc: 'Objects Sequelize->JSON purs'
  }
];

errorTypes.forEach(error => {
  console.log(`${error.status} ${error.name}`);
  console.log(`   ${error.desc}`);
});

console.log('\n🎯 ACTIONS REQUISES:');
if (allCorrect) {
  console.log('✅ Toutes les corrections sont appliquées');
  console.log('🔄 Redémarrer le serveur backend');
  console.log('🗄️  Exécuter create_v_candidats.sql dans PostgreSQL');
  console.log('🧪 Tester les endpoints corrigés');
} else {
  console.log('⚠️  Certaines corrections sont manquantes');
  console.log('📝 Vérifier les fichiers marqués ❌');
  console.log('🔄 Appliquer les corrections manquantes');
}

console.log('\n🛠️  ÉTAPES DE TEST:');
console.log('1. CREATE VIEW v_candidats (create_v_candidats.sql)');
console.log('2. Redémarrer backend: npm run dev');  
console.log('3. Tester /unite/statistiques');
console.log('4. Tester /unite/candidats-eligibles-rh');
console.log('5. Tester /unite/questionsReponses');
console.log('6. Vérifier logs sans erreur SQL/Sequelize');