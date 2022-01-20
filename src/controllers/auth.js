const authModel = require("../models/auth");
const hashPass = require("../helpers/hash");
const jwt = require("../helpers/genToken");
const auth = {};
const response = require("../helpers/response");

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
      response.success(res, 401, { pesan: "password atau email salah" });
    }
    const token = jwt.CreateTokens({ role: users.role_id, email, id });
    return response.success(res, 200, { status: "ok", pesan: "anda berhasil login", token: token, profilepic: profilepic, role: role_id });
  } catch (error) {
    return response.err(res, 401, error);
  }
};

module.exports = auth;
