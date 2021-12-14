const models = require("../models/users");
const Users = {};
const helpers = require("../helpers/hash");

Users.GetAll = async (req, res) => {
  try {
    const result = await models.GetAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

Users.GetByid = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.GetByid(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(err);
  }
};

Users.UpdatePass = async (req, res) => {
  try {
    const { password, id } = req.body;
    const pass = await helpers.hashPassword(password);
    const result = await models.UpdatePass(id, pass);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

Users.UpdateData = async (req, res) => {
  try {
    const { id } = req.query;
    const { body } = req.body;
    const result = await models.UpdateData(body, id);
    return res.status(200).json({ result });
  } catch (error) {
    return res.send(error);
  }
};

Users.Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.Delete(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

Users.profilePic = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(401).json({ pesan: "file harus ber tipe PNG,JPG,JPEG" });
    }
    const { path } = req.file;
    const { id } = req.query;
    const result = await models.postImg(path, id);
    return res.status(200).json({ pesan: "upload berhasil", result });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = Users;
