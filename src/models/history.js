const database = require("../config/database");
const history = {};

history.getall = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT history.id, users.firstname AS "user",history.vehicle_name, history.date, history.prepayment, history.hasbeen_returned, history.rating FROM vehicle_rental.history INNER JOIN vehicle_rental.users ON history.user_id = users.id`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// popular vehicle by rating
history.getrating = (rating) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT history.id,users.firstname AS "User" ,history.vehicle_name, history.date, history.prepayment, history.hasbeen_returned, history.rating
      FROM vehicle_rental.history
      JOIN vehicle_rental.users ON history.id = vehicle_rental.users.id
      ORDER BY vehicle_rental.history.rating ${rating}`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

history.update = (data) => {
  return new Promise((resolve, reject) => {
    const { id, vehicle_name, date, prepayment, hasbeen_returned, user_id, rating } = data;
    const sqlQuery = `
    UPDATE vehicle_rental.history
    SET history.vehicle_name = "${vehicle_name}", history.date = "${date}", history.prepayment = ${prepayment}, history.hasbeen_returned = "${hasbeen_returned}", history.user_id = ${user_id}, history.rating = ${rating}
    WHERE history.id = ${id}`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

history.create = (data) => {
  return new Promise((resolve, reject) => {
    const { vehicle_name, date, prepayment, hasbeen_returned, user_id, rating } = data;
    const sqlQuery = `INSERT INTO vehicle_rental.history (vehicle_name, date, prepayment, hasbeen_returned, user_id, rating) VALUES ("${vehicle_name}","${date}",${prepayment},"${hasbeen_returned}", ${user_id}, ${rating})`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve({ pesan: "pemasukan data berhasil", result: { id: result.insertId, vehicle_name, date, prepayment, hasbeen_returned, user_id, rating } });
    });
  });
};

history.delet = (data) => {
  return new Promise((resolve, reject) => {
    const { id } = data;
    const sqlQuery = `DELETE FROM vehicle_rental.history WHERE history.id = ${id};`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = history;
