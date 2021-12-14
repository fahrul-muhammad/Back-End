const express = require("express");
const usersRouter = express.Router();
const controllers = require("../controllers/users");
const middleware = require("../middlewares/validate");
const upload = require("../middlewares/upload");

usersRouter.get("/", middleware.ValidateToken("1"), controllers.GetAll);
usersRouter.get("/:id", middleware.ValidateToken("1"), controllers.GetByid);
usersRouter.patch("/", middleware.updateDataUsers, controllers.UpdateData);
usersRouter.patch("/changePass", controllers.UpdatePass);
usersRouter.delete("/:id", middleware.ValidateToken("1"), controllers.Delete);
usersRouter.post("/profilepic", upload, controllers.profilePic);

module.exports = usersRouter;
