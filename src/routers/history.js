const express = require("express");
const historyRouter = express.Router();
const controllers = require("../controllers/history");
const validateToken = require("../middlewares/validate");

historyRouter.get("/", validateToken.ValidateToken("1"), controllers.getall);
// POPULAR VEHICLE BY RATING
historyRouter.get("/popular", controllers.GetPopular);
// UPDATE HISTORY
historyRouter.patch("/update", controllers.update);
// POST NEW HISTORY
historyRouter.post("/", controllers.create);
// DELET HISTORY
historyRouter.delete("/:id", validateToken.ValidateToken("1"), controllers.delet);

module.exports = historyRouter;
