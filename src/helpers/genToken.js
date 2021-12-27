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

jToken.Validate = (tokens) => {};

module.exports = jToken;
