const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");
const validate = require("../middlewares/signUpVal");

// /auth
authRouter.post("/", authController.signIn); // login
authRouter.post("/signup", validate.validate, authController.signUp); // register
authRouter.delete("/"); // log out

module.exports = authRouter;
