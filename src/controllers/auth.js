const authModel = require("../models/auth");
const hashPass = require("../helpers/hash");
const hash = require("../helpers/hash");
const jwt = require("../helpers/genToken");
const auth = {};

auth.signUp = async (req, res) => {
  try {
    const { body } = req;
    body.password = await hashPass.hashPassword(body.password);
    const result = await authModel.SignUp(body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

auth.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await authModel.signIn(email);
    if (!users) {
      return res.status(200).json({ pesan: "Silahkan daftra" });
    }
    const isAuth = await hash.validatePassword(password, users.password);
    if (!isAuth) {
      return res.status(200).json({ pesan: "Password salah" });
    }
    const tokens = jwt.CreateTokens({ role: users.role_id, email });
    if (users.role_id === 1) {
      return res.status(200).json({ pesan: "Berhasil login", token: tokens });
    }
    return res.status(200).json({ pesan: "Anda Berhasil Login" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = auth;
