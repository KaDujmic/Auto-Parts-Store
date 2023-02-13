const { order } = require('../models');
const crudController = require('../controllers/crudController');

exports.getAllOrders = async (req, res) => {
  await crudController.findAllModel(order, req, res);
};
exports.getOrder = async (req, res) => {
  await crudController.findOne(order, req, res);
};
exports.createOrder = async (req, res) => {
  await crudController.create(order, req, res);
};
exports.updateOrder = async (req, res) => {
  await crudController.update(order, req, res);
};
exports.deleteOrder = async (req, res) => {
  await crudController.delete(order, req, res);
};
