const RhView = require('../models/rhViewModel');

const loginRh = async (email) => {
  return await RhView.findOne({ where: { email } });
};

module.exports = { loginRh };
