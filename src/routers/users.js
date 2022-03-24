const express = require("express");
const usersRouter = express.Router();
const controllers = require("../controllers/users");
const middleware = require("../middlewares/validate");
const upload = require("../middlewares/upload");

usersRouter.get("/profile", middleware.Token, controllers.GetProfile);
usersRouter.get("/", middleware.ValidateRole(["1"]), controllers.GetAll);
usersRouter.get("/:id", /* middleware.ValidateRole(["1"]), */ controllers.GetByid);
usersRouter.patch("/", middleware.Token, upload.multerHandler, controllers.UpdateData);
usersRouter.patch("/changePass", controllers.UpdatePass);
usersRouter.delete("/:id", middleware.Token, middleware.ValidateRole(["1"]), controllers.Delete);
usersRouter.patch("/profilepic", upload.multerHandler, controllers.profilePic);
usersRouter.patch("/setfirebasetoken", controllers.setToken);

module.exports = usersRouter;
