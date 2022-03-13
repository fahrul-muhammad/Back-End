const express = require("express");
const historyRouter = express.Router();
const controllers = require("../controllers/history");
const validate = require("../middlewares/validate");

// get all user history
historyRouter.get("/", validate.ValidateRole(["1"]), controllers.getall);
// USER HISTORY
historyRouter.get("/myhistory", validate.ValidateRole(["1", "2", "3"]), controllers.myHistory);
// POPULAR VEHICLE BY RATING
historyRouter.get("/popular", controllers.GetPopular);
// UPDATE HISTORY
historyRouter.patch("/update", validate.ValidateRole(["1"]), controllers.update);
// POST NEW HISTORY
historyRouter.post("/", validate.ValidateRole(["1", "2", "3"]), controllers.create);
// DELET HISTORY
historyRouter.delete("/:id", validate.ValidateRole(["1"]), controllers.delet);

module.exports = historyRouter;
