const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");
const middleware = require("../middlewares/validate");

// /auth
authRouter.post("/", middleware.signIn, authController.signIn); // login
authRouter.post("/signup", middleware.signUp, authController.signUp); // register
authRouter.post("/forgotpassword", authController.forgotPass); // RESET AND SEND OTP
authRouter.patch("/setnewpassword", authController.setNewPassword);
authRouter.post("/logout", authController.LogOut);

module.exports = authRouter;
