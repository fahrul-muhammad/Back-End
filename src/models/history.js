const database = require("../config/database");
const mysql = require("mysql");
const history = {};

history.getall = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT history.id, users.firstname AS "user",vehicle.name AS "vehicle", history.date, history.prepayment, status.name AS "status", history.rating
    FROM vehicle_rental.history 
    INNER JOIN vehicle_rental.users ON history.user_id = users.id
    INNER JOIN vehicle_rental.vehicle ON history.vehicle_id = vehicle.id
    INNER JOIN vehicle_rental.status ON history.status_id = status.id`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// popular vehicle by rating
history.getrating = (rating) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT history.id, users.firstname AS "user",vehicle.name AS "vehicle", history.date, history.prepayment, status.name AS "status", history.rating
    FROM vehicle_rental.history 
    INNER JOIN vehicle_rental.users ON history.user_id = users.id
    INNER JOIN vehicle_rental.vehicle ON history.vehicle_id = vehicle.id
    INNER JOIN vehicle_rental.status ON history.status_id = vehicle_rental.status.id
    ORDER BY vehicle_rental.history.rating ?`;
    database.query(sqlQuery, [mysql.raw(rating)], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

history.update = (data) => {
  return new Promise((resolve, reject) => {
    const { vehicle_id, date, prepayment, status_id, user_id, rating, id } = data;
    const sqlQuery = `
    UPDATE vehicle_rental.history
    SET history.vehicle_id = ?, history.date = ?, history.prepayment = ?, history.status_id = ?, history.user_id = ?, history.rating = ?
    WHERE history.id=?`;
    database.query(sqlQuery, [vehicle_id, date, prepayment, status_id, user_id, rating, id], (err, result) => {
      console.log(id, vehicle_id, date, prepayment, status_id, user_id, rating);
      if (err) return reject(err);
      resolve({ pesan: "perubahan data berhasil", result });
    });
  });
};

history.create = (data) => {
  return new Promise((resolve, reject) => {
    const { vehicle_id, date, prepayment, status_id, user_id, rating } = data;
    const sqlQuery = `INSERT INTO vehicle_rental.history SET vehicle_id=?, date=?, prepayment=?, status_id=?, user_id=?, rating=?`;
    database.query(sqlQuery, [vehicle_id, date, prepayment, status_id, user_id, rating], (err, result) => {
      if (err) return reject(err);
      resolve({ pesan: "pemasukan data berhasil", result: { id: result.insertId, vehicle_id, date, prepayment, status_id, user_id, rating } });
    });
  });
};

history.delet = (data) => {
  return new Promise((resolve, reject) => {
    const { id } = data;
    const sqlQuery = `DELETE FROM vehicle_rental.history WHERE history.id = ?;`;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = history;
