const models = require("../models/users");
const Users = {};

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
    const { id } = req.params;
    const { firstname } = req.body;
    const result = await models.Update(id, firstname);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

Users.Create = async (req, res) => {
  try {
    const result = await models.Create(req.body);
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

Users.profilePic = (req, res) => {
  if (req.file === undefined) {
    return res.status(401).json({ pesan: "file tidak sesuai requriment" });
  }
  res.status(200).json({ pesan: "upload berhasil", url: req.file });
};

module.exports = Users;
