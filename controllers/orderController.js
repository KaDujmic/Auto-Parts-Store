const { order, item, order_item, notification } = require('../models');
const crudController = require('../controllers/crudController');
const { checkAllElements, setOrderPrice, retrieveItemOnOrder } = require('../utils/orderService');
const { orderConfirmEmail, orderArrivedEmail } = require('../utils/notificationService');

exports.getAllOrders = async (req, res) => {
  await crudController.findAllModel(order, req, res);
};

exports.getOrder = async (req, res) => {
  await crudController.findModel(order, req, res);
};

exports.createOrder = async (req, res) => {
  await checkAllElements(item, req, res);
  await setOrderPrice(req, res);

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

exports.confirmOrder = async (req, res) => {
  const pendingOrder = await order.findByPk(req.params.id);
  await retrieveItemOnOrder(pendingOrder.dataValues, req, res);
  pendingOrder.orderStatus = 'pending_delivery';
  pendingOrder.save();
  orderConfirmEmail(pendingOrder.userId);
  res.status(200).json(pendingOrder);
};

exports.completeOrder = async (req, res) => {
  const orderStatus = { orderStatus: 'completed' };
  await order.update(orderStatus, {
    where: { id: req.params.id, deleted: false },
    returning: true
  });
  await notification.update({ deleted: true }, {
    where: { orderId: req.params.id }
  });
  res.status(204).json();
};

exports.getCustomerOrders = async (req, res) => {
  const query = req.body.orderStatus === undefined ? ['pending_confirmation', 'pending_delivery', 'ready_for_pickup', 'completed'] : req.body.orderStatus;
  const customerOrders = await order.findAll({
    where: {
      userId: res.locals.user.id,
      orderStatus: query,
      deleted: false
    }
  });
  res.status(200).json(customerOrders);
};

exports.orderStatusCheck = async (req, res) => {
  const orderItems = await order_item.findAll({
    where: {
      orderId: req.params.firstId,
      status: 'pending'
    }
  });
  if (orderItems.length === 0) {
    const currentOrder = await order.findOne({
      where: {
        id: req.params.firstId
      }
    });
    currentOrder.orderStatus = 'ready_for_pickup';
    currentOrder.save();
    orderArrivedEmail(req.params.firstId);
  }
};
