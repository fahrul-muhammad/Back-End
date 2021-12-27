const models = require("../models/history");
const response = require("../helpers/response");
const history = {};

history.getall = async (req, res) => {
  try {
    const result = await models.getall();
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

history.GetPopular = async (req, res) => {
  try {
    const result = await models.GetPopular();
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

history.update = async (req, res) => {
  try {
    const result = await models.update(req.body);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

history.create = async (req, res) => {
  try {
    const result = await models.create(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

history.delet = async (req, res) => {
  try {
    const result = await models.delet(req.params);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

module.exports = history;
