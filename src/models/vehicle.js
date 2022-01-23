const database = require("../config/database");
const mysql = require("mysql");
const vehicle = {};

vehicle.getAllPaginated = async (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT vehicle.id, vehicle.name AS "Vehicle_Name", price AS "Price", vehicle_category.name AS "Category",vehicle.image AS "photos", location AS "lokasi"
  FROM vehicle
  JOIN vehicle_category ON vehicle.category = vehicle_category.id`;
    const statement = [];
    let order = query.order;
    let orderBy = "";
    if (order === undefined) {
      order = "asc";
    }
    if (query.sorting === undefined) {
      query.sorting = "name";
    }
    if (query.sorting && query.sorting.toLowerCase() == "name") orderBy = "vehicle.name";
    if (query.sorting && query.sorting.toLowerCase() == "price") orderBy = "vehicle.price";
    if (query.sorting && query.sorting.toLowerCase() == "category") orderBy = "vehicle_category.name";
    if (order && orderBy) {
      sqlQuery += ` ORDER BY ? ? `;
      statement.push(mysql.raw(orderBy), mysql.raw(order));
    }
    const countQuery = `SELECT COUNT(*) AS "count" from vehicle`;
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
        next: page == Math.ceil(count / limit) ? null : `/vehicle?sorting=${query.sorting}&order=${order}&page=${page + 1}&limit=${limit}`,
        prev: page == 1 ? null : `/vehicle?sorting=${query.sorting}&order=${order}&page=${page - 1}&limit=${limit}`,
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
    const sqlQuery = `SELECT vehicle.id, vehicle.name AS "Vehicle_Name", price AS "Price",vehicle_category.name AS "Category", image as "Image", location
    FROM vehicle
    JOIN vehicle_category ON vehicle.category = vehicle_category.id
    WHERE vehicle.name LIKE ?
    ORDER BY vehicle.name ASC`;
    database.query(sqlQuery, [keyword], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.create = (data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicle
    SET ?`;
    database.query(sqlQuery, [data], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.delet = (data) => {
  return new Promise((resolve, reject) => {
    const { id } = data;
    const sqlQuery = `DELETE FROM vehicle WHERE vehicle.id = ?;`;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.update = (data, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
    UPDATE vehicle
    SET ?
    WHERE vehicle.id = ?`;
    database.query(sqlQuery, [data, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.searchByCategory = (requirement) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT vehicle.id, vehicle.name AS "Vehicle_Name", price AS "Price", vehicle_category.name AS "Category",vehicle.image AS "photos", location AS "lokasi"
      FROM vehicle 
      JOIN vehicle_category ON vehicle.category = vehicle_category.id
      WHERE vehicle_category.name = ?`;

    const statement = [requirement.category];

    const countQuery = `SELECT COUNT(*) AS "count" FROM vehicle 
    JOIN vehicle_category ON vehicle.category = vehicle_category.id
    WHERE vehicle_category.name = ?`;

    database.query(countQuery, statement, (err, result) => {
      if (err) return reject({ status: 500, err });
      const { page, limit } = requirement.query;
      const pages = page ? parseInt(page) : 0;
      const limits = limit ? parseInt(limit) : 10;
      const count = result[0].count;

      if (page && limit) {
        sqlQuery += ` ORDER BY vehicle.id ASC LIMIT ?,?`;
        const offset = (pages - 1) * limits;
        console.log(offset);
        statement.push(offset, limits);
      }

      const meta = {
        next: pages == Math.ceil(count / limits) ? null : `/vehicle/${requirement.category}?page=${pages + 1}&limit=${limits}`,
        prev: pages == 1 ? null : `/vehicle/${requirement.category}?page=${pages - 1}&limit=${limits}`,
        count,
      };
      database.query(sqlQuery, statement, (err, result) => {
        if (err) return reject(err);
        resolve({ status: 200, result: { data: result, meta } });
      });
    });
  });
};

vehicle.vehicleImg = (pathFile, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicle
    SET vehicle.image = ?
    WHERE vehicle.id = ?`;
    database.query(sqlQuery, [pathFile, id], (err, result) => {
      if (err) return reject(err);
      console.log(err);
      resolve({ pesan: "berhasil meng unggah gambar", result });
    });
  });
};

vehicle.getById = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id, vehicle.name,vehicle.price,vehicle_category.name AS "category", vehicle.image AS "image", vehicle.location AS "location", vehicle.stock AS "stock", vehicle.description AS "description"
    FROM vehicle
    JOIN vehicle_category ON vehicle.category = vehicle_category.id
    WHERE vehicle.id = ?`;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) return reject(err);
      resolve({ pesan: "berhasil mengambil data", result });
    });
  });
};

module.exports = vehicle;
