const express = require("express");
const notificationRouter = express.Router();
const notifController = require("../controllers/notification");

notificationRouter.post("/send", notifController.send);

module.exports = notificationRouter;
