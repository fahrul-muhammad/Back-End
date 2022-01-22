const database = require("../config/database");
const mysql = require("mysql");
const history = {};

history.getall = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT history.id, users.name AS "user",vehicle.name AS "vehicle", history.date, history.prepayment, status.name AS "status", history.rating
    FROM history 
    INNER JOIN users ON history.user_id = users.id
    INNER JOIN vehicle ON history.vehicle_id = vehicle.id
    INNER JOIN status ON history.status_id = status.id`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// popular vehicle by rating
history.GetPopular = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id AS "vehicle_id", vehicle.name AS "name", COUNT(history.vehicle_id) AS "Jumlah pengguna", AVG(history.rating) AS " rata-rata rating pengguna", vehicle.location AS "location", vehicle.image AS "photo"
    FROM history
    JOIN vehicle ON vehicle.id = history.vehicle_id
    GROUP BY vehicle_id
    ORDER BY COUNT(history.vehicle_id) DESC
    LIMIT 4`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

history.update = (data) => {
  return new Promise((resolve, reject) => {
    const { vehicle_id, date, prepayment, status_id, user_id, rating, id } = data;
    const sqlQuery = `
    UPDATE history
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
    const sqlQuery = `INSERT INTO history SET vehicle_id=?, date=?, prepayment=?, status_id=?, user_id=?, rating=?`;
    database.query(sqlQuery, [vehicle_id, date, prepayment, status_id, user_id, rating], (err, result) => {
      if (err) return reject(err);
      resolve({ pesan: "pemasukan data berhasil", result: { id: result.insertId, vehicle_id, date, prepayment, status_id, user_id, rating } });
    });
  });
};

history.delet = (data) => {
  return new Promise((resolve, reject) => {
    const { id } = data;
    const sqlQuery = `DELETE FROM history WHERE history.id = ?;`;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

history.myHistory = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT history.id, users.name AS "user" , users.id AS "user_id",vehicle.name AS "vehicle", history.date, history.prepayment, status.name AS "status", history.rating,vehicle.image AS "image"
    FROM history 
    INNER JOIN users ON history.user_id = users.id
    INNER JOIN vehicle ON history.vehicle_id = vehicle.id
    INNER JOIN status ON history.status_id = status.id
    WHERE users.id = ? `;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = history;
