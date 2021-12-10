const database = require("../config/database");
const auth = {};

auth.SignUp = (data) => {
  return new Promise((resolve, reject) => {
    const { firstname, lastname, gender, email, phone_number, DoB, address, password, role_id } = data;
    const sqlQuery = `INSERT INTO vehicle_rental.users SET firstname=?, lastname=?, gender=?, email=?, phone_number=?, DoB=?, address=?, password=?, role_id=?`;
    database.query(sqlQuery, [firstname, lastname, gender, email, phone_number, DoB, address, password, role_id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

auth.signIn = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;
    database.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) resolve(false);
      resolve(result[0]);
    });
  });
};

module.exports = auth;
