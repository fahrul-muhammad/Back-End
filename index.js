// Myexpress
require("dotenv").config();
const express = require("express");
const mainRouter = require("./src/routers/main.js");

const server = express();
const morgan = require("morgan");
const logger = morgan(":method :url :status :res[content-length] - :response-time ms");

//local port
const port = 8000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(mainRouter);

server.listen(port, () => {
  console.log(`server telah berjalan di port ${port}`);
});
