const { item } = require('../db/models');
const crudController = require('./crudController');

exports.getItem = async (req, res) => {
  await crudController.findModel(item, req, res);
};

exports.getManyItem = async (req, res) => {
  if (req.query.page && req.query.page !== 'count') {
    // Request can come with params used for filtering (manufacturer, category)
    const query = {};
    query.where = createWhereOption(req.query);
    await crudController.findManyModel(item, query, req, res);
  } else if (req.query.page === 'count') {
    // Request to get the number of pages; used by frontend page selection
    await crudController.findNumberOfPages(item, req, res);
  } else {
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
