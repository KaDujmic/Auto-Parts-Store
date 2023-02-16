const { order, item } = require('../models');
const crudController = require('../controllers/crudController');
const { checkAllElements } = require('../utils/orderService');

exports.getAllOrders = async (req, res) => {
  await crudController.findAllModel(order, req, res);
};
exports.getOrder = async (req, res) => {
  await crudController.findModel(order, req, res);
};
exports.createOrder = async (req, res) => {
  await checkAllElements(item, req, res);

  // eslint-disable-next-line max-len
  const { id, userId, deliveryAddress, deliveryDate, orderStatus, itemList, finalPrice, fullPrice, currency } = req.body;
  const orderDate = new Date();
  const model = await order.create({
    id,
    userId,
    deliveryAddress,
    deliveryDate,
    orderDate,
    orderStatus,
    itemList,
    finalPrice,
    fullPrice,
    currency
  });
  res.status(201).json(model);
};
exports.updateOrder = async (req, res) => {
  await crudController.updateModel(order, req, res);
};
exports.deleteOrder = async (req, res) => {
  await crudController.deleteModel(order, req, res);
};
