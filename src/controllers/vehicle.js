const models = require("../models/vehicle");
const response = require("../helpers/response");
const vehicle = {};

vehicle.getall = async (req, res) => {
  try {
    const { query } = req;
    const result = await models.getAllPaginated(query);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.search = async (req, res) => {
  try {
    const { query } = req;
    let keyword = "%%";
    if (query.name) keyword = `%${query.name}%`;
    const result = await models.search(keyword);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.create = async (req, res) => {
  try {
    const result = await models.create(req.body);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.delet = async (req, res) => {
  try {
    const result = await models.delet(req.params);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.update = async (req, res) => {
  try {
    const result = await models.update(req.body);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.searchByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const result = await models.searchByCategory(category);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.vehicleImg = async (req, res) => {
  try {
    const photos = req.files;
    let dataImg = {};
    for (let i = 0; i < photos.length; i++) {
      dataImg += photos[i].filename + " ";
    }
    const result = await models.vehicleImg(dataImg);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

module.exports = vehicle;
