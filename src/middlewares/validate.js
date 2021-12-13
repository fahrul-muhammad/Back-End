const val = {};
const jwt = require("jsonwebtoken");

val.signUp = (req, res, next) => {
  const { body } = req;
  const signUpBody = ["firstname", "lastname", "gender", "email", "phone_number", "DoB", "address", "password", "role_id"];
  const bodyProperty = Object.keys(body);
  const isBodyValid = signUpBody.filter((property) => !bodyProperty.includes(property)).length == 0 ? true : false;
  if (!isBodyValid) return res.status(500).json({ pesan: "invalid body" });
  next();
};

val.signIn = (req, res, next) => {
  const { body } = req;
  const signInBody = ["email", "password"];
  const bodyProperty = Object.keys(body);
  const isBodyValid = signInBody.filter((property) => !bodyProperty.includes(property)).length == 0 ? true : false;
  if (!isBodyValid) return res.status(500).json({ pesan: "harus mengisi email dan password" });
  next();
};

val.ValidateToken = (roles) => {
  return (req, res, next) => {
    const { token } = req.headers;
    if (token.length == 0) return res.status(401).json({ pesan: "harus memiliki token untuk mengakses endpoint ini" });
    jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
      if (err) return res.status(403).json({ err });
      if (roles != payload.role) return res.status(401).json({ pesan: "anda tidak memiliki akses untuk endpoint ini" });
    });
    next();
  };
};

module.exports = val;
