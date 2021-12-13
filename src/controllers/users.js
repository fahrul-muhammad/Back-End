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

Users.Update = async (req, res) => {
  try {
    const { password, id } = req.body;
    const pass = await helpers.hashPassword(password);
    const result = await models.Update(id, pass);
    return res.status(200).json(result);
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
    const { path } = req.file;
    const { id } = req.query;
    console.log(path);
    if (path === undefined) {
      return res.status(401).json({ pesan: "file tidak sesuai requriment" });
    }
    const result = await models.postImg(path, id);
    return res.status(200).json({ pesan: "upload berhasil", result });
  } catch (error) {
    return res.send(error);
  }
};

/* 
  console.log(req.file);
  if (req.file === undefined) {
    return res.status(401).json({ pesan: "file tidak sesuai requriment" });
  }
  res.status(200).json({ pesan: "upload berhasil", url: req.file });
  console.log(req.file.path);
*/

module.exports = Users;
