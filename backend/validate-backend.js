#!/usr/bin/env node

/**
 * Script de vérification de conformité du backend Axiom
 * Vérifie que les modèles, services et contrôleurs sont conformes aux scripts SQL
 */

const fs = require('fs');
const path = require('path');

// Configuration des chemins
const CONFIG = {
  backendRoot: path.resolve(__dirname),
  modelsDir: path.join(__dirname, 'models'),
  servicesDir: path.join(__dirname, 'services'),
  controllersDir: path.join(__dirname, 'controllers'),
  configDir: path.join(__dirname, 'config'),
  sqlFiles: [
    'table.sql',
    'vues_tsiky.sql',
    'view_candidats.sql'
  ]
};

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class BackendValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.successes = [];
  }

  log(message, type = 'info') {
    const color = {
      error: colors.red,
      warning: colors.yellow,
      success: colors.green,
      info: colors.blue
    }[type] || colors.reset;

    console.log(`${color}${message}${colors.reset}`);
  }

  async validateTableNames() {
    this.log('\n🔍 Vérification des noms de tables...', 'info');
    
    try {
      const tablesSql = fs.readFileSync(path.join(CONFIG.configDir, 'table.sql'), 'utf8');
      
      // Extraction des noms de tables
      const tableRegex = /CREATE TABLE (\w+)/gi;
      const tables = [];
      let match;
      
      while ((match = tableRegex.exec(tablesSql)) !== null) {
        tables.push(match[1]);
      }

      this.log(`✅ ${tables.length} tables trouvées dans table.sql`, 'success');
      this.log(`📋 Tables: ${tables.join(', ')}`, 'info');

      // Vérification des modèles correspondants
      const modelsDir = CONFIG.modelsDir;
      const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('Model.js'));
      
      tables.forEach(table => {
        const expectedModelFile = `${table}Model.js`;
        const modelExists = modelFiles.some(f => 
          f.toLowerCase() === expectedModelFile.toLowerCase()
        );
        
        if (modelExists) {
          this.successes.push(`✅ Modèle trouvé pour la table ${table}`);
        } else {
          this.warnings.push(`⚠️  Modèle manquant pour la table ${table}`);
        }
      });

      return { tables, modelFiles };
    } catch (error) {
      this.errors.push(`❌ Erreur lors de la lecture de table.sql: ${error.message}`);
      return { tables: [], modelFiles: [] };
    }
  }

  async validateViews() {
    this.log('\n🔍 Vérification des vues...', 'info');
    
    try {
      const vuesTsiky = fs.readFileSync(path.join(CONFIG.configDir, 'vues_tsiky.sql'), 'utf8');
      
      // Extraction des noms de vues
      const viewRegex = /CREATE VIEW (\w+)/gi;
      const views = [];
      let match;
      
      while ((match = viewRegex.exec(vuesTsiky)) !== null) {
        views.push(match[1]);
      }

      this.log(`✅ ${views.length} vues trouvées dans vues_tsiky.sql`, 'success');
      this.log(`📋 Vues: ${views.join(', ')}`, 'info');

      return views;
    } catch (error) {
      this.errors.push(`❌ Erreur lors de la lecture de vues_tsiky.sql: ${error.message}`);
      return [];
    }
  }

  async validateServices() {
    this.log('\n🔍 Vérification des services...', 'info');
    
    try {
      const servicesDir = CONFIG.servicesDir;
      const serviceFiles = this.getAllJsFiles(servicesDir);
      
      this.log(`📁 ${serviceFiles.length} fichiers de service trouvés`, 'info');

      // Vérification de la structure des services critiques
      const criticalServices = [
        'viewCandidatsService.js',
        'candidatsStatsService.js',
        'candidatsDetailsService.js'
      ];

      criticalServices.forEach(service => {
        const serviceExists = serviceFiles.some(f => f.includes(service));
        if (serviceExists) {
          this.successes.push(`✅ Service critique trouvé: ${service}`);
        } else {
          this.errors.push(`❌ Service critique manquant: ${service}`);
        }
      });

      return serviceFiles;
    } catch (error) {
      this.errors.push(`❌ Erreur lors de la vérification des services: ${error.message}`);
      return [];
    }
  }

  async validateControllers() {
    this.log('\n🔍 Vérification des contrôleurs...', 'info');
    
    try {
      const controllersDir = CONFIG.controllersDir;
      const controllerFiles = fs.readdirSync(controllersDir).filter(f => f.endsWith('.js'));
      
      this.log(`📁 ${controllerFiles.length} contrôleurs trouvés`, 'info');

      // Vérification des contrôleurs critiques
      const criticalControllers = [
        'statController.js',
        'uniteController.js',
        'rhController.js',
        'ceoController.js'
      ];

      criticalControllers.forEach(controller => {
        if (controllerFiles.includes(controller)) {
          this.successes.push(`✅ Contrôleur critique trouvé: ${controller}`);
        } else {
          this.errors.push(`❌ Contrôleur critique manquant: ${controller}`);
        }
      });

      return controllerFiles;
    } catch (error) {
      this.errors.push(`❌ Erreur lors de la vérification des contrôleurs: ${error.message}`);
      return [];
    }
  }

  async validateErrorHandling() {
    this.log('\n🔍 Vérification de la gestion d\'erreurs...', 'info');
    
    try {
      const statController = fs.readFileSync(
        path.join(CONFIG.controllersDir, 'statController.js'), 
        'utf8'
      );

      // Vérification de la présence de contrôles de données vides
      const hasEmptyDataControls = statController.includes('hasData') || 
                                  statController.includes('isEmpty') ||
                                  statController.includes('Array.isArray');

      const hasTryCatch = statController.includes('try {') && 
                         statController.includes('} catch');

      const hasValidation = statController.includes('age1 < 0') ||
                           statController.includes('validation');

      if (hasEmptyDataControls) {
        this.successes.push('✅ Contrôles de données vides implémentés');
      } else {
        this.warnings.push('⚠️  Contrôles de données vides à améliorer');
      }

      if (hasTryCatch) {
        this.successes.push('✅ Gestion d\'erreurs try/catch présente');
      } else {
        this.errors.push('❌ Gestion d\'erreurs try/catch manquante');
      }

      if (hasValidation) {
        this.successes.push('✅ Validation des paramètres implémentée');
      } else {
        this.warnings.push('⚠️  Validation des paramètres à améliorer');
      }

    } catch (error) {
      this.errors.push(`❌ Erreur lors de la vérification de la gestion d'erreurs: ${error.message}`);
    }
  }

  getAllJsFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllJsFiles(fullPath));
      } else if (item.endsWith('.js')) {
        files.push(fullPath);
      }
    });
    
    return files;
  }

  async generateReport() {
    this.log('\n📊 RAPPORT DE CONFORMITÉ BACKEND AXIOM', 'info');
    this.log('=' * 50, 'info');

    // Résumé général
    this.log(`\n📈 RÉSUMÉ:`, 'info');
    this.log(`✅ Succès: ${this.successes.length}`, 'success');
    this.log(`⚠️  Avertissements: ${this.warnings.length}`, 'warning');
    this.log(`❌ Erreurs: ${this.errors.length}`, 'error');

    // Détails des succès
    if (this.successes.length > 0) {
      this.log('\n✅ SUCCÈS:', 'success');
      this.successes.forEach(success => this.log(success, 'success'));
    }

    // Détails des avertissements
    if (this.warnings.length > 0) {
      this.log('\n⚠️  AVERTISSEMENTS:', 'warning');
      this.warnings.forEach(warning => this.log(warning, 'warning'));
    }

    // Détails des erreurs
    if (this.errors.length > 0) {
      this.log('\n❌ ERREURS CRITIQUES:', 'error');
      this.errors.forEach(error => this.log(error, 'error'));
    }

    // Recommandations
    this.log('\n💡 RECOMMANDATIONS:', 'info');
    
    if (this.errors.length > 0) {
      this.log('🔧 Corriger les erreurs critiques en priorité', 'warning');
    }
    
    if (this.warnings.length > 0) {
      this.log('⚙️  Améliorer les points d\'avertissement', 'warning');
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      this.log('🎉 Backend conforme aux spécifications SQL !', 'success');
    }

    // Score de conformité
    const totalChecks = this.successes.length + this.warnings.length + this.errors.length;
    const score = totalChecks > 0 ? Math.round((this.successes.length / totalChecks) * 100) : 0;
    
    this.log(`\n🏆 SCORE DE CONFORMITÉ: ${score}%`, score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error');
    
    return {
      score,
      successes: this.successes.length,
      warnings: this.warnings.length,
      errors: this.errors.length
    };
  }

  async run() {
    this.log(`${colors.bold}🚀 VALIDATION DU BACKEND AXIOM${colors.reset}`, 'info');
    this.log('Vérification de la conformité avec les scripts SQL...', 'info');

    try {
      await this.validateTableNames();
      await this.validateViews();
      await this.validateServices();
      await this.validateControllers();
      await this.validateErrorHandling();
      
      const report = await this.generateReport();
      
      // Code de sortie basé sur le score
      process.exit(report.errors > 0 ? 1 : 0);
      
    } catch (error) {
      this.log(`❌ Erreur critique lors de la validation: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Exécution du script
if (require.main === module) {
  const validator = new BackendValidator();
  validator.run();
}

module.exports = BackendValidator;