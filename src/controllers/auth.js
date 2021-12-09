const authModel = require("../models/auth");
const bcrypt = require("bcrypt");
const auth = {};

auth.signUp = async (req, res) => {
  try {
    const { body } = req;
    const result = await authModel.signUp(body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

auth.signIn = async (req, res) => {
  try {
    const { body } = req;
    const result = await authModel.signIn(body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = auth;
