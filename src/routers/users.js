const express = require("express");
const usersRouter = express.Router();
const ctrls = require("../controllers/users");

usersRouter.get("/", ctrls.GetAll);
usersRouter.post("/", ctrls.Create);
usersRouter.get("/:firstname", ctrls.GetByFirstName);
usersRouter.patch("/update", ctrls.Update);
usersRouter.delete("/delet", ctrls.Delete);

module.exports = usersRouter;
