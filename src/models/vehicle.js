const { query } = require("express");
const database = require("../config/database");
const mysql = require("mysql");
const vehicle = {};

vehicle.GetAll = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id, vehicle.name AS "Vehicle_Name", price AS "Price", vehicle_category.name AS "Category"
      FROM vehicle_rental.vehicle
      JOIN vehicle_rental.vehicle_category ON vehicle.category = vehicle_category.id`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
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
