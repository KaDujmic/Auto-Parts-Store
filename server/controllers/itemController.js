const { item } = require('../db/models');
const crudController = require('./crudController');

exports.getItem = async (req, res) => {
  await crudController.findModel(item, req, res);
};

exports.getManyItem = async (req, res) => {
  // See if Category or Manufacturer query parameters exist, and add to the 'where' query option if they do
  const query = {};
  query.where = createWhereOption(req.query);

  if (Object.keys(query).length !== 0) {
    // Find filtered items
    await crudController.findManyModel(item, query, req, res);
  } else {
    // Find complete list of Items
    await crudController.findManyModel(item, null, req, res);
  }
};

exports.updateItem = async (req, res) => {
  await crudController.updateModel(item, req, res);
};

exports.deleteItem = async (req, res) => {
  await crudController.deleteModel(item, req, res);
};

exports.createItem = async (req, res) => {
  await crudController.createModel(item, req, res);
};

function createWhereOption (requestQueryParams) {
  const whereOption = [];

  if (requestQueryParams.category) {
    whereOption.push({ category_id: requestQueryParams.category });
  }
  if (requestQueryParams.manufacturer) {
    whereOption.push({ manufacturer_id: requestQueryParams.manufacturer });
  }

  return whereOption;
}
