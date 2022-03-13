const express = require("express");
const notificationRouter = express.Router();
const notifController = require("../controllers/notification");

notificationRouter.post("/send", notifController.send);
notificationRouter.get("/gettoken/:id", notifController.getToken);

module.exports = notificationRouter;
