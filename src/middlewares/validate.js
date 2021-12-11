const val = {};
const { token } = require("morgan");
const helpers = require("../helpers/genToken");

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

val.usersValidate = (req, res, next) => {
  let token = "";
  if (req.headers.token && req.headers.token.startsWith("Bearer")) {
    token = req.headers.token.split(" ")[1];
  }
  if (token.length == 0) return res.status(401).json({ pesan: "harus memiliki token untuk mengakses endpoint ini" });
  next();
};

module.exports = val;
