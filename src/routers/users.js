const express = require("express");
const usersRouter = express.Router();
const controllers = require("../controllers/users");
const middleware = require("../middlewares/validate");
const helpers = require("../helpers/genToken");

usersRouter.get("/", middleware.usersValidate, controllers.GetAll);
usersRouter.post("/", controllers.Create);
usersRouter.get("/:id", controllers.GetByid);
usersRouter.patch("/:id", controllers.Update);
usersRouter.delete("/:id", controllers.Delete);

module.exports = usersRouter;
