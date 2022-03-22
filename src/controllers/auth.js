const authModel = require("../models/auth");
const hashPass = require("../helpers/hash");
const jwt = require("../helpers/genToken");
const auth = {};
const response = require("../helpers/response");
const { sendForgotPass } = require("../helpers/sendEmail");

auth.signUp = async (req, res) => {
  try {
    const { body } = req;
    body.password = await hashPass.hashPassword(body.password);
    const result = await authModel.SignUp(body);
    return response.success(res, 200, "selamat datang");
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(401).json({ pesan: "email sudah terdaftar silahkan Log in" });
    }
    return res.status(500).json(error);
  }
};

auth.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await authModel.signIn(email);
    const { id, role_id, profilepic } = users;
    if (!users) {
      return response.success(res, 401, { pesan: "email belum terdaftar, silahkan daftar terlebih dahulu" });
    }
    const isAuth = await hashPass.validatePassword(password, users.password);
    if (!isAuth) {
      return response.success(res, 401, { pesan: "password atau email salah" });
    }
    const token = jwt.CreateTokens({ role: users.role_id, email, id });
    return response.success(res, 200, { status: "ok", pesan: "anda berhasil login", token: token, profilepic: profilepic, role: role_id });
  } catch (error) {
    return response.err(res, 401, error);
  }
};

auth.forgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await authModel.signIn(email);
    console.log("USERS", users);
    if (users.length <= 0) return response.err(res, 500, { pesan: "email notfound" });
    let Pin = `${(Math.random() + 1).toString(36).substring(7)}`;
    console.log("Pin", Pin.toUpperCase());
    const insertPin = await authModel.insertPin(Pin, email);
    console.log("INSERT PIN", insertPin);
    await sendForgotPass(email, users, Pin);
    await authModel.resetPassword(Pin);
    return response.success(res, 200, { pesan: "OTP are sending to your email, please check your email" });
  } catch (error) {
    console.log(error);
  }
};

auth.setNewPassword = async (req, res) => {
  try {
    const { pin, password } = req.body;
    const hashPassword = await hashPass.hashPassword(password);
    const result = await authModel.updateNewPassword(hashPassword, pin);
    console.log("RESULT", result);
    return response.success(res, 200, { pesan: "Reset Password done, let's Login with new passowrd" });
  } catch (error) {
    return response.err(res, 400, error);
  }
};

module.exports = auth;
