const { item } = require('../db/models');
const crudController = require('./crudController');

exports.getItem = async (req, res) => {
  await crudController.findModel(item, req, res);
};

exports.getAllItem = async (req, res) => {
  if (typeof req.query !== 'undefined') {
    const query = { where: [], attributes: { exclude: ['createdAt', 'updatedAt', 'deleted'] } };
    query.where = getWhereOption(req.query);

    const foundItems = await item.findAll(query);
    res.status(200).json(foundItems);
  } else await crudController.findAllModel(item, req, res);
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

function getWhereOption (queryParams) {
  const whereOption = [];

  if (queryParams.category) {
    whereOption.push({ category_id: queryParams.category });
  }
  if (queryParams.manufacturer) {
    whereOption.push({ manufacturer_id: queryParams.manufacturer });
  }

  return whereOption;
}
