const database = require("../config/database");
const Transaction = {};
const mysql = require("mysql");

Transaction.GetByOwnerId = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `
    GET * FROM transaction
    WHERE transaction.owner_id = ?
    `;
  });
};
