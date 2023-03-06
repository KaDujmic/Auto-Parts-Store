const { item } = require('../db/models');
const crudController = require('./crudController');

exports.getItem = async (req, res) => {
  await crudController.findModel(item, null, req, res);
};

exports.getManyItem = async (req, res) => {
  // Populate query.where if Category and/or Manufacturer parameters exist (for filtering)
  const query = {};
  query.where = createWhereOption(req.query);

  await crudController.findManyModel(item, query, req, res);
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
