const { item } = require('../db/models');
const crudController = require('./crudController');

exports.getItem = async (req, res) => {
  await crudController.findModel(item, req, res);
};

exports.getAllItem = async (req, res) => {
  console.log(req.query);
  console.log(typeof req.query);
  if (typeof req.query === 'undefined') {
    await crudController.findAllModel(item, req, res);
  } else if (req.query.page === 'count') {
    await crudController.getNumberOfPages(item, req, res);
  } else {
    // If request has query params add them to the db query for filtering purposes
    const offset = process.env.DEFAULT_LIMIT * (Number(req.query.page) - 1) || 0;
    const limit = Number(process.env.DEFAULT_LIMIT);
    const query = { order: [['id', 'ASC']], offset, limit, where: [{ deleted: false }], attributes: { exclude: ['createdAt', 'updatedAt', 'deleted'] } };
    query.where = getWhereOption(req.query);

    const foundItems = await item.findAll(query);
    res.status(200).json(foundItems);
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
