const database = require("../config/database");
const bcrypt = require("bcrypt");
const auth = {};

auth.signUp = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "INSERT INTO vehicle_rental.users SET ?";
    bcrypt
      .hash(body.password, 10)
      .then((hash) => {
        const newBody = {
          ...body,
          password: hash,
        };
        database.query(sqlQuery, [newBody], (err, result) => {
          if (err) return reject({ status: 500, err });
          resolve({ status: 201, result });
        });
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

auth.signIn = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const sqlQuery = `SELECT users.id,users.firstname,users.lastname,users.gender,users.email,users.phone_number,users.DoB, users.address,roles.name
    FROM vehicle_rental.users 
    INNER JOIN vehicle_rental.roles ON users.role_id = roles.id
    WHERE email = ? AND password = ?`;
    database.query(sqlQuery, [email, password], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return reject({ status: 401, pesan: "Email atau Password yang anda masukan salah" });
      resolve({ pesan: "anda berhadsil LogIn", result });
    });
  });
};

module.exports = auth;
