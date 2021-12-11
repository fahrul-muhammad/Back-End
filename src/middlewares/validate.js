const val = {};
const jwt = require("jsonwebtoken");
const database = require("../config/database");

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
  jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
    if (err) return res.status(403).json({ err });
  });
  next();
};

// val.checkEmail = (req, res, next) => {
//   let val;
//   const sqlQuery = `SELECR * FROM vehicle_rental.users.email`;
//   database.query(sqlQuery, (err, result) => {
//     if (err) return err;
//     val += result;
//     res.status(200).json({ val });
//   });
//   const { email } = req.body;
//   for (let i = 0; i < val; i++) {
//     if (email[i] === val) {
//       return res.json({ pesan: "email sudah terdaftar" });
//     }
//   }
//   next();
// };

module.exports = val;
