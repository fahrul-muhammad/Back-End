const jwt = require("jsonwebtoken");
const jToken = {};

jToken.CreateTokens = (users) => {
  const payloads = {
    role: users.role,
    email: users.email,
  };

  const tokens = jwt.sign(payloads, process.env.JWT_KEYS, { expiresIn: "30s" });
  return tokens;
};

jToken.Validate = (tokens) => {
  jwt.verify(tokens, process.env.JWT_KEYS, (err, users) => {
    if (err) return false;
    return { users, oke: true };
  });
};

module.exports = jToken;
