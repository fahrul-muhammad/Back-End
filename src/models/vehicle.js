const database = require("../config/database");
const vehicle = {};

vehicle.GetAll = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id, vehicle.vehicle_name AS "Vehicle_Name", vehicle_price AS "Price",vehicle_category.name AS "Category" 
      FROM vehicle_rental.vehicle 
      JOIN vehicle_rental.vehicle_category ON vehicle.vehicle_category = vehicle_category.id`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.search = (keyword) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id, vehicle.vehicle_name AS "Vehicle_Name", vehicle_price AS "Price",vehicle_category.name AS "Category" 
            FROM vehicle_rental.vehicle
            JOIN vehicle_rental.vehicle_category ON vehicle.vehicle_category = vehicle_category.id
            WHERE vehicle_name LIKE "${keyword}"`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.create = (data) => {
  return new Promise((resolve, reject) => {
    const { vehicle_name, vehicle_price, vehicle_category } = data;
    const sqlQuery = `INSERT INTO vehicle_rental.vehicle (vehicle_name,vehicle_price,vehicle_category) VALUES ("${vehicle_name}","${vehicle_price}",${vehicle_category})`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.delet = (data) => {
  return new Promise((resolve, reject) => {
    const { id } = data;
    const sqlQuery = `DELETE FROM vehicle_rental.vehicle WHERE vehicle.id = "${id}";`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.update = (data) => {
  return new Promise((resolve, reject) => {
    const { id, vehicle_name, vehicle_price, vehicle_category } = data;
    const sqlQuery = `
    UPDATE vehicle_rental.vehicle
    SET vehicle.vehicle_name = "${vehicle_name}", vehicle.vehicle_price = "${vehicle_price}", vehicle.vehicle_category = ${vehicle_category}
    WHERE vehicle.id = ${id}`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

vehicle.searchByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT vehicle.id, vehicle.vehicle_name AS "Vehicle_Name", vehicle_price AS "Price",vehicle_category.name AS "Category" 
      FROM vehicle_rental.vehicle 
      JOIN vehicle_rental.vehicle_category ON vehicle.vehicle_category = vehicle_category.id
      WHERE vehicle_category.name = "${category}"`;
    database.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = vehicle;
