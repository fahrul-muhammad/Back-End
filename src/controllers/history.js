const models = require("../models/history");
const history = {};

history.getall = async (req, res) => {
  try {
    const result = await models.getall();
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

history.getrating = async (req, res) => {
  try {
    const { rating } = req.params;
    const result = await models.getrating(rating);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

history.update = async (req, res) => {
  try {
    const result = await models.update(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

history.create = async (req, res) => {
  try {
    const result = await models.create(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

history.delet = async (req, res) => {
  try {
    const result = await models.delet(req.params);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = history;
