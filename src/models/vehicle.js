const database = require("../config/database");
const mysql = require("mysql");
const vehicle = {};

vehicle.getAllPaginated = async (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT vehicle.id, vehicle.name AS "Vehicle_Name", price AS "Price", vehicle_category.name AS "Category"
  FROM vehicle_rental.vehicle
  JOIN vehicle_rental.vehicle_category ON vehicle.category = vehicle_category.id`;

    const statement = [];
    const order = query.order;
    let orderBy = "";
    if (query.by && query.by.toLowerCase() == "name") orderBy = "vehicle.name";
    if (query.by && query.by.toLowerCase() == "price") orderBy = "vehicle.price";
    if (query.by && query.by.toLowerCase() == "category") orderBy = "vehicle_category.name";
    if (order && orderBy) {
      sqlQuery += ` ORDER BY ? ? `;
      statement.push(mysql.raw(orderBy, mysql.raw(order)));
    }
    const countQuery = `SELECT COUNT(*) AS "count" from vehicle_rental.vehicle`;
    database.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      const page = parseInt(query.page);
      const limit = parseInt(query.limit);
      const count = result[0].count;
      if (query.page && query.limit) {
        sqlQuery += ` LIMIT ? OFFSET ?`;
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      }
      const meta = {
        next: page == Math.ceil(count / limit) ? null : `/vehicle?by=${query.by}&order=asc&page=${page + 1}&limit=4`,
        prev: page == 1 ? null : `/vehicle?by=${query.by}&order=asc&page=${page - 1}&limit=4`,
        count,
      };
      database.query(sqlQuery, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        return resolve({ status: 200, result: { data: result, meta } });
      });
    });
  });
};

vehicle.search = (keyword) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id, vehicle.name AS "Vehicle_Name", price AS "Price",vehicle_category.name AS "Category" 
    FROM vehicle_rental.vehicle
    JOIN vehicle_rental.vehicle_category ON vehicle.category = vehicle_category.id
    WHERE vehicle.name LIKE ?`;
    database.query(sqlQuery, [keyword], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.create = (data) => {
  return new Promise((resolve, reject) => {
    const { name, price, category } = data;
    const sqlQuery = `INSERT INTO vehicle_rental.vehicle  SET name=?,price=?,category=?`;
    database.query(sqlQuery, [name, price, category], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.delet = (data) => {
  return new Promise((resolve, reject) => {
    const { id } = data;
    const sqlQuery = `DELETE FROM vehicle_rental.vehicle WHERE vehicle.id = ?;`;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.update = (data) => {
  return new Promise((resolve, reject) => {
    const { name, price, category, id } = data;
    const sqlQuery = `
    UPDATE vehicle_rental.vehicle
    SET vehicle.name = ? , vehicle.price = ?, vehicle.category = ? 
    WHERE vehicle.id = ?`;
    database.query(sqlQuery, [name, price, category, id], (err, result) => {
      console.log(name, price, category, id);
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.searchByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id, vehicle.name AS "Vehicle_Name", price AS "Price",vehicle_category.name AS "Category" 
      FROM vehicle_rental.vehicle 
      JOIN vehicle_rental.vehicle_category ON vehicle.category = vehicle_category.id
      WHERE vehicle_category.name = ?`;
    database.query(sqlQuery, [category], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = vehicle;
