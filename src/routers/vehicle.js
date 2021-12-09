const express = require("express");
const vehicleRouter = express.Router();
const controllers = require("../controllers/vehicle");

// Get All data Vehicle from database
vehicleRouter.get("/", controllers.getall);
// search by keyword
vehicleRouter.get("/search", controllers.search);
// POST NEW VEHICLE
vehicleRouter.post("/", controllers.create);
// DELET
vehicleRouter.delete("/:id", controllers.delet);
// UPDATE
vehicleRouter.patch("/update", controllers.update);
// get all vehicle by category / pathparams
vehicleRouter.get("/:category", controllers.searchByCategory);

module.exports = vehicleRouter;
