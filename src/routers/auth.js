const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");
const middleware = require("../middlewares/validate");

// /auth
authRouter.post("/", middleware.signIn, authController.signIn); // login
authRouter.post("/signup", middleware.signUp, authController.signUp); // register

module.exports = authRouter;
