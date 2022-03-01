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
    const { newPassword, email } = req.body;
    const pass = await helpers.hashPassword(newPassword);
    const result = await models.UpdatePass(pass, email);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

Users.UpdateData = async (req, res) => {
  try {
    console.log("REQ FROM BODY", req.body);
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
      console.log(req.file);
      const photo = "/" + req.file.filename;
      data.profilepic = photo;
    }
    // hash password if password is update
    if (data.password !== undefined) {
      data.password = await hashPass.hashPassword(data.password);
    }
    let users = jwt.decode(token);
    const { id } = users;
    console.log(id);
    const result = await models.UpdateData(data, id);
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

Users.GetProfile = async (req, res) => {
  try {
    const { token } = req.headers;
    const userData = jwt.decode(token);
    const { id } = userData;
    const result = await models.GetProfile(id);
    return response.success(res, 200, { pesan: "Berhasil", result });
  } catch (error) {
    return response.err(res, 404, error);
  }
};

module.exports = Users;
