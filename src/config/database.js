const mysql = require("mysql");
const database = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.UNAME,
  password: process.env.PASS,
  database: process.env.DATABASE,
});

module.exports = database;
