const express = require("express");
const vehicleRouter = express.Router();
const ctrls = require("../controllers/vehicle");

// Get All data Vehicle from database
vehicleRouter.get("/", ctrls.getall);
// search by keyword
vehicleRouter.get("/search", ctrls.search);
// POST NEW VEHICLE
vehicleRouter.post("/newvehicle", ctrls.create);
// DELET
vehicleRouter.delete("/delet", ctrls.delet);
// UPDATE
vehicleRouter.patch("/update", ctrls.update);
// get all vehicle by category / pathparams
vehicleRouter.get("/:category", ctrls.searchByCategory);

module.exports = vehicleRouter;
