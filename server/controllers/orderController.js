const { order, item, order_item, notification, user } = require('../db/models');
const crudController = require('./crudController');
const { checkAllElements, setOrderPrice, retrieveItemOnOrder, checkCustomerOrders } = require('../services/orderService');
const { orderConfirmEmail, orderArrivedEmail } = require('../services/notificationService');
const ORDER_STATUS_LIST = ['pending_confirmation', 'pending_delivery', 'ready_for_pickup', 'completed'];

exports.getManyOrder = async (req, res) => {
  const query = { include: { model: user, attributes: ['id', 'fullName', 'email'] } };
  await crudController.findManyModel(order, query, req, res);
};

exports.getOrder = async (req, res) => {
  const query = {
    include: { model: user, attributes: ['id', 'fullName', 'email'] }
  };
  await crudController.findModel(order, query, req, res);
};

exports.createOrder = async (req, res) => {
  // Check all elements and remove duplicates
  await checkAllElements(item, req, res);
  // Set the full price and final price in order
  await setOrderPrice(req, res);
  // Block new order if user has more than 5 orders that are not completed
  await checkCustomerOrders(req, res);

  const { id, userId, itemList } = req.body;
  const orderDate = new Date().toISOString().split('T')[0];
  const model = await order.create({
    id,
    userId,
    itemList,
    orderDate,
    orderStatus: 'pending_confirmation'
  });
  res.status(201).json(model);
};

exports.updateOrder = async (req, res) => {
  await crudController.updateModel(order, req, res);
};

exports.deleteOrder = async (req, res) => {
  await crudController.deleteModel(order, req, res);
};

// Once the order is created, this function will confirm it and remove from storage or order items
exports.confirmOrder = async (req, res) => {
  const pendingOrder = await order.findByPk(req.params.id);
  await retrieveItemOnOrder(pendingOrder.dataValues, req, res);
  pendingOrder.orderStatus = 'pending_delivery';
  pendingOrder.save();
  orderConfirmEmail(pendingOrder.userId);
  res.status(200).json(pendingOrder);
};

// Function to set order status to completed and cancel notifications for that order
exports.completeOrder = async (req, res) => {
  const orderStatus = { orderStatus: 'completed' };
  const completedOrder = await order.update(orderStatus, {
    where: { id: req.params.id, deleted: false },
    returning: true
  });
  await notification.update({ deleted: true }, {
    where: { orderId: req.params.id }
  });
  res.status(200).json(completedOrder[1]);
};

// Function that returns orders for the logged in user
exports.getCustomerOrders = async (req, res) => {
  const query = req.body.orderStatus === undefined ? ORDER_STATUS_LIST : req.body.orderStatus;
  const customerOrders = await order.findAll({
    where: {
      userId: res.locals.user.id,
      orderStatus: query,
      deleted: false
    },
    include: user
  });
  res.status(200).json(customerOrders);
};

// Function that checks if all items for that order arrived
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
