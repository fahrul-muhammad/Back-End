const express = require("express");
const usersRouter = express.Router();
const controllers = require("../controllers/users");
const middleware = require("../middlewares/validate");
const upload = require("../middlewares/upload");

usersRouter.get("/", middleware.usersValidate, controllers.GetAll);
usersRouter.post("/", controllers.Create);
usersRouter.get("/:id", controllers.GetByid);
usersRouter.patch("/:id", controllers.Update);
usersRouter.delete("/:id", controllers.Delete);
usersRouter.post("/profilepic", upload, controllers.profilePic);

module.exports = usersRouter;
