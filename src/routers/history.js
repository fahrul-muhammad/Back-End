const express = require("express");
const historyRouter = express.Router();
const ctrls = require("../controllers/history");

historyRouter.get("/", ctrls.getall);
// POPULAR VEHICLE BY RATING
historyRouter.get("/:rating", ctrls.getrating);
// UPDATE HISTORY
historyRouter.patch("/update", ctrls.update);
// POST NEW HISTORY
historyRouter.post("/newhistory", ctrls.create);
// DELET HISTORY
historyRouter.delete("/:id", ctrls.delet);

module.exports = historyRouter;
