const { order, item } = require('../models');
const crudController = require('../controllers/crudController');
const { checkAllElements } = require('../utils/elementList');

exports.getAllOrders = async (req, res) => {
  await crudController.findAllModel(order, req, res);
};
exports.getOrder = async (req, res) => {
  await crudController.findOne(order, req, res);
};
exports.createOrder = async (req, res) => {
  await checkAllElements(item, req, res);
  // req.body.item_list = JSON.stringify(req.body.item_list);
  await crudController.createModel(order, req, res);
};
exports.updateOrder = async (req, res) => {
  await crudController.updateModel(order, req, res);
};
exports.deleteOrder = async (req, res) => {
  await crudController.deleteModel(order, req, res);
};
