const jwt = require("jsonwebtoken");
const jToken = {};

jToken.CreateTokens = (users) => {
  const payloads = {
    role: users.role,
    email: users.email,
    id: users.id,
  };
  const tokens = jwt.sign(payloads, process.env.JWT_KEYS, { expiresIn: "5h" });
  return tokens;
};

jToken.Validate = (tokens) => {
  jwt.verify(tokens, process.env.JWT_KEYS, (err, payload) => {
    if (err) return false;
    return { users, oke: true };
  });
};

module.exports = jToken;
