// Myexpress
require("dotenv").config();
const express = require("express");
const mainRouter = require("./src/routers/main.js");
const cors = require("cors");

const server = express();
const morgan = require("morgan");
const logger = morgan(":method :url :status :res[content-length] - :response-time ms");

//local port
const port = process.env.PORT || 8000;

const whitelist = ["http://localhost:3000", "circle-vehicle-rental.herokuapp.com", "https://circle-vehicle-rental.netlify.app/", "https://circle-vehicle-rental.herokuapp.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// const corsOptions = {
//   origin: ["https://circlevehicle.netlify.app/", "http://127.0.0.1:5500/index.html", "http://localhosts:8000/"],
//   allowedHeaders: "token",
//   methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
// };
// server.use(cors(corsOptions));
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(mainRouter);
server.use(express.static("public/img"));

server.listen(port, () => {
  console.log(`server telah berjalan di port ${port}`);
});
