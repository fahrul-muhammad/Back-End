const express = require("express");
const usersRouter = express.Router();
const controllers = require("../controllers/users");

usersRouter.get("/", controllers.GetAll);
usersRouter.post("/", controllers.Create);
usersRouter.get("/:id", controllers.GetByid);
usersRouter.patch("/:id", controllers.Update);
usersRouter.delete("/:id", controllers.Delete);

module.exports = usersRouter;
