const models = require("../models/users");
const Users = {};
const helpers = require("../helpers/hash");
const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const hashPass = require("../helpers/hash");

Users.GetAll = async (req, res) => {
  try {
    const result = await models.GetAll();
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

Users.GetByid = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.GetByid(id);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

Users.UpdatePass = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.headers;
    if (token == undefined) {
      response.err(res, 400, "anda harus login terlebih dahulu");
    }
    let userId = "";
    jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
      const { id } = payload;
      userId += id;
    });
    const pass = await helpers.hashPassword(password);
    const result = await models.UpdatePass(userId, pass);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

Users.UpdateData = async (req, res) => {
  try {
    const { token } = req.headers;
    if (token == undefined) {
      response.err(res, 400, "anda harus login terlebih dahulu");
    }
    const data = req.body;
    if (Object.keys(data).length === 0) {
      return response.err(res, 400, "tidak ada file yang di ubah");
    }
    // upload check
    if (req.file !== undefined) {
      data.profilepic = req.file.filename;
    }
    // hash password if password is update
    if (data.password !== undefined) {
      data.password = await hashPass.hashPassword(data.password);
    }
    let userId = "";
    jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
      const { id } = payload;
      userId += id;
    });
    const result = await models.UpdateData(data, userId);
    const { protocol41 } = result;
    return response.success(res, 200, { protocol41, pesan: "data berhasil di ubah", update: data });
  } catch (error) {
    return response.err(res, 500, error);
  }
};

Users.Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.Delete(id);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

Users.profilePic = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).json({
        pesan: "file harus ber tipe PNG,JPG,JPEG",
      });
    }
    const { path, filename } = req.file;
    const { token } = req.headers;
    let userId = "";
    if (token.length == 0) return res.status(401).json({ pesan: "harus log In terlebih dahulu" });
    jwt.verify(token, process.env.JWT_KEYS, (err, payload) => {
      const { id } = payload;
      userId += id;
    });
    const result = await models.postImg(filename, userId);
    return response.success(res, 200, { pesan: "upload berhasil", uploaded: { filename, path } });
  } catch (error) {
    return response.err(res, 500, error);
  }
};

module.exports = Users;
