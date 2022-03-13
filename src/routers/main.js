const express = require("express");
const mainRouter = express.Router();

const usersRouter = require("./users");
const vehicleRouter = require("./vehicle");
const historyRouter = require("./history");
const authRouter = require("./auth");
const notificationRouter = require("./notification");

mainRouter.use("/users", usersRouter);
mainRouter.use("/vehicle", vehicleRouter);
mainRouter.use("/history", historyRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/notif", notificationRouter);

module.exports = mainRouter;
