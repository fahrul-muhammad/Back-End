const database = require("../config/database");
const fireBase = {};

fireBase.getUserToken = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT users.id,users.fire_base_token AS "FBtoken" 
    FROM users 
    WHERE users.id = ?`;
    database.query(sqlQuery, [id], (err, result) => {
      if (err) return reject({ status: 400, err });
      resolve(result);
    });
  });
};

module.exports = fireBase;
