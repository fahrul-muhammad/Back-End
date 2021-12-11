const database = require("../config/database");
const auth = {};

auth.SignUp = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicle_rental.users SET ?`;
    database.query(sqlQuery, [body], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

auth.signIn = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM vehicle_rental.users WHERE email = ?`;
    database.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) resolve(false);
      resolve(result[0]);
    });
  });
};

module.exports = auth;
