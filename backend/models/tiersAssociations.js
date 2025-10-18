// Centralize Tiers-related associations to avoid circular dependencies
const Tiers = require('./tiersModel');
const LangueTiers = require('./langueTiersModel');
const QualiteTiers = require('./qualiteTiersModel');
const ExperienceTiers = require('./experienceTiersModel');
const NiveauFiliereTiers = require('./niveauFiliereTiersModel');

// Tiers -> hasMany related details with explicit aliases used in includes
Tiers.hasMany(LangueTiers, { foreignKey: 'id_tiers', as: 'langueTiers' });
Tiers.hasMany(QualiteTiers, { foreignKey: 'id_tiers', as: 'qualiteTiers' });
Tiers.hasMany(ExperienceTiers, { foreignKey: 'id_tiers', as: 'experienceTiers' });
Tiers.hasMany(NiveauFiliereTiers, { foreignKey: 'id_tiers', as: 'niveauFiliereTiers' });

module.exports = {
  Tiers,
  LangueTiers,
  QualiteTiers,
  ExperienceTiers,
  NiveauFiliereTiers
};
