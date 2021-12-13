const express = require("express");
const vehicleRouter = express.Router();
const controllers = require("../controllers/vehicle");
const valid = require("../middlewares/validate");

// Get All data Vehicle from database
vehicleRouter.get("/", controllers.getall);
// search by keyword
vehicleRouter.get("/search", controllers.search);
// POST NEW VEHICLE
vehicleRouter.post("/", valid.ValidateToken("3"), controllers.create);
// DELET
vehicleRouter.delete("/:id", valid.ValidateToken("1"), controllers.delet);
// UPDATE
vehicleRouter.patch("/update", controllers.update);
// get all vehicle by category / pathparams
vehicleRouter.get("/:category", controllers.searchByCategory);

module.exports = vehicleRouter;
