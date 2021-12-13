const database = require("../config/database");
const Users = {};

Users.GetAll = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT users.id, users.firstname, users.lastname, users.email, users.phone_number, users.DoB, users.address, roles.name AS "role"
    FROM vehicle_rental.users
    INNER JOIN vehicle_rental.roles ON users.role_id = roles.id 
    ORDER BY users.id DESC`;
    database.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.GetByid = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * 
    FROM vehicle_rental.users 
    WHERE users.id = ? `;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.Update = (id, name) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
        UPDATE vehicle_rental.users
        SET users.password =  ?
        WHERE users.id = ?`;
    database.query(sqlQuery, [name, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.Delete = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
        DELETE FROM vehicle_rental.users WHERE users.id = ?;`;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = Users;
