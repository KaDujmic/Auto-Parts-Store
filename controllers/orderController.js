const { order } = require('../models');
const crudController = require('../controllers/crudController');

exports.getAllOrders = async (req, res) => {
  await crudController.findAllModel(order, req, res);
};
exports.getOrder = async (req, res) => {
  await crudController.findOne(order, req, res);
};
exports.createOrder = async (req, res) => {
  await crudController.createModel(order, req, res);
};
exports.updateOrder = async (req, res) => {
  await crudController.updateModel(order, req, res);
};
exports.deleteOrder = async (req, res) => {
  await crudController.deleteModel(order, req, res);
};
