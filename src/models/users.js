const database = require("../config/database");
const Users = {};
const mysql = require("mysql");
const { profilePic } = require("../controllers/users");

Users.GetAll = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT users.id, users.name, users.email, users.phone_number, users.DoB, users.address, roles.name AS "role"
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

Users.UpdatePass = (password, email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
        UPDATE vehicle_rental.users
        SET users.password =  ?
        WHERE users.email = ?`;
    database.query(sqlQuery, [password, email], (err, result) => {
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

Users.postImg = (path, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicle_rental.users
    SET users.profilepic = ?
    WHERE users.id = ?`;
    database.query(sqlQuery, [path, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.UpdateData = (data, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicle_rental.users
     SET ?
     WHERE users.id = ?`;
    database.query(sqlQuery, [data, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.GetProfile = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM vehicle_rental.users WHERE users.id = ?";
    database.query(sqlQuery, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = Users;
