const database = require("../config/database");
const { profilePic } = require("../controllers/users");
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

Users.Create = (data) => {
  return new Promise((resolve, reject) => {
    const { firstname, lastname, gender, email, phone_number, DoB, address, password, role_id } = data;
    const sqlQuery = `INSERT INTO vehicle_rental.users SET firstname=?, lastname=?, gender=?, email=?, phone_number=?, DoB=?, address=?, password=?, role_id=?`;
    database.query(sqlQuery, [firstname, lastname, gender, email, phone_number, DoB, address, password, role_id], (err, result) => {
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

// Users.profilePic = (body) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = `SELECT * FROM vehicle_rental.users WHERE users.id = ?`;
//     database.query(sqlQuery, [body.id], (err, result) => {
//       if (err) return reject(err);
//     });
//   });
// };

/* 
let imgSrc = `http://localhost:8000/users/profilepic` + body.file.filename;
    const idQuery = `SELECT * FROM vehicle_rental.users WHERE users.id = ?`;
    database.query(idQuery, [body.file.id], (err, result) => {
      if (err) return reject(err);
      const sqlQuery = `INSERT INTO vehicle_rental.users (users.profilepic) SET users.profilepic=?`;
      database.query(sqlQuery, [imgSrc], (err) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
*/

module.exports = Users;
