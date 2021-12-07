const database = require("../config/database");
const Users = {};

Users.GetAll = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM vehicle_rental.users order by id DESC";
    database.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.GetByFirstName = (name) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM vehicle_rental.users WHERE firstname="${name}"`;
    database.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.Update = (id, name) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
        UPDATE vehicle_rental.users
        SET users.firstname = "${name}"
        WHERE users.id = ${id}`;
    database.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.Create = (data) => {
  return new Promise((resolve, reject) => {
    const { firstname, lastname, gender, email, phone_number, date_birth, address } = data;
    const sqlQuery = `INSERT INTO vehicle_rental.users (firstname,lastname,gender,email,phone_number,date_birth,address) VALUES ("${firstname}","${lastname}","${gender}","${email}",${phone_number},"${date_birth}","${address}" )`;
    database.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

Users.Delete = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
        DELETE FROM vehicle_rental.users WHERE users.id = ${id};`;
    database.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = Users;
