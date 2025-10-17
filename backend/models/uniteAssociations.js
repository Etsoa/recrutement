const UniteEntretien = require('./uniteEntretiensModel');
const StatusUniteEntretien = require('./statusUniteEntretiensModel');

// UniteEntretien relations
UniteEntretien.hasMany(StatusUniteEntretien, { foreignKey: 'id_unite_entretien', as: 'statusEntretiens' });

module.exports = { UniteEntretien, StatusUniteEntretien };
