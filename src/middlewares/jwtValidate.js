const jwt = {};
const res = require("express/lib/response");

//jwt validate headers
// jwt.verifyToken(token, (err, token) => {
//   if (err) return res.json(401, { pesan: "user is not logged in" });
//   req.token = token;
//   req.users = token;
//   return next();
// });

module.exports = jwt;
