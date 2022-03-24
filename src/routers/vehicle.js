const express = require("express");
const vehicleRouter = express.Router();
const controllers = require("../controllers/vehicle");
const valid = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const vehicle = require("../controllers/vehicle");
const { request } = require("express");

// Get All data Vehicle from database
vehicleRouter.get("/", valid.ValidateRole(["1", "2", "3"]), controllers.getall);
// GET BY ID
vehicleRouter.get("/detail/:id", controllers.getById);
// search by keyword
vehicleRouter.get("/search", valid.Token, valid.ValidateRole(["1", "2", "3"]), controllers.search);
// POST NEW VEHICLE
vehicleRouter.get("/myvehicle", valid.ValidateRole(["1", "3"]), controllers.getByUserId);
vehicleRouter.post("/", valid.ValidateRole(["1", "3"]), upload.multiUpload, controllers.create);
// DELET
vehicleRouter.patch("/:id", valid.ValidateRole(["1", "2", "3"]), controllers.softDelet);
// UPDATE
vehicleRouter.patch("/update/:id", upload.multiUpload, controllers.update);
// vehicle image
vehicleRouter.post("/vehicle_image/:id", valid.ValidateRole(["1", "3"]), upload.multiUpload, controllers.vehicleImg);
// get all vehicle by category / pathparams
vehicleRouter.get("/:category", /* valid.ValidateRole(["1", "2", "3"]), */ controllers.searchByCategory);
// GET VEHICLE BY USER ID

vehicleRouter.post("/test", upload.testHandlers, (req, res) => {
  console.log(req.file);
  console.log(req.files);
  if (req.file !== undefined || req.files !== undefined) {
    return res.send("masuk");
  } else {
    return res.send("nice try");
  }
});

vehicleRouter.post("/test2", upload.multiUpload, (req, res) => {
  console.log(req.file);
  console.log(req.files);
  if (req.file !== undefined || req.files !== undefined) {
    return res.send("masuk");
  } else {
    return res.send("nice try");
  }
});

module.exports = vehicleRouter;
