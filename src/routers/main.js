const express = require("express");
const mainRouter = express.Router();

const usersRouter = require("./users");
const vehicleRouter = require("./vehicle");
const historyRouter = require("./history");

mainRouter.use("/users", usersRouter);
mainRouter.use("/vehicle", vehicleRouter);
mainRouter.use("/history", historyRouter);

module.exports = mainRouter;
