const models = require("../models/vehicle");
const vehicle = {};

vehicle.getall = async (req, res) => {
  try {
    const { query } = req;
    const result = await models.getAllPaginated(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

vehicle.search = async (req, res) => {
  try {
    const { query } = req;
    let keyword = "%%";
    if (query.name) keyword = `%${query.name}%`;
    const result = await models.search(keyword);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

vehicle.create = async (req, res) => {
  try {
    const result = await models.create(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

vehicle.delet = async (req, res) => {
  try {
    const result = await models.delet(req.params);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

vehicle.update = async (req, res) => {
  try {
    const result = await models.update(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

vehicle.searchByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const result = await models.searchByCategory(category);
    return res.status(200).json(result);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = vehicle;
