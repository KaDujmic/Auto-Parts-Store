const { order, item } = require('../models');
const crudController = require('../controllers/crudController');
const { checkAllElements, setOrderPrice, retriveItemOnOrder } = require('../utils/orderService');
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
  const updatedData = await order.update(req.body, {
    where: { id: req.params.id, deleted: false },
    returning: true
  });

  if (req.body.orderStatus === 'pending_delivery') orderConfirmEmail(req.body.id);
  else if (req.body.orderStatus === 'ready_for_pickup') orderArrivedEmail(req.body.id);

  res.status(200).json(updatedData[1]);
};

exports.deleteOrder = async (req, res) => {
  await crudController.deleteModel(order, req, res);
};

exports.confirmOrder = async (req, res) => {
  const pendingOrder = await order.findByPk(req.params.id);
  await retriveItemOnOrder(pendingOrder.dataValues, req, res);
  pendingOrder.orderStatus = 'pending_delivery';
  pendingOrder.save();
  res.status(200).json(pendingOrder);
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
