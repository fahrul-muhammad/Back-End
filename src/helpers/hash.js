const bcrypt = require("bcrypt");

const hash = {};

hash.hashPassword = async (password) => {
  const salts = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salts);
  return result;
};

hash.validatePassword = async (password, hashPass) => {
  const result = await bcrypt.compare(password, hashPass);
  return result;
};

// hash.round = async (password) => {
//   const result = bcrypt.(password);
//   return result;
// };

module.exports = hash;
