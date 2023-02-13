const { order } = require('../models');
const crudController = require('../controllers/crudController');

exports.getAllOrders = async (req, res) => {
  crudController.findAllModel(order, req, res);
};
exports.getOrder = async (req, res) => {
  crudController.findOne(order, req, res);
};
exports.createOrder = async (req, res) => {
  crudController.create(order, req, res);
};
exports.updateOrder = async (req, res) => {
  crudController.update(order, req, res);
};
exports.deleteOrder = async (req, res) => {
  crudController.delete(order, req, res);
};
