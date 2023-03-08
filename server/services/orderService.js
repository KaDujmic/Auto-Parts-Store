const { Sequelize, user, item, order_item, order, sequelize } = require('../db/models');
const Op = Sequelize.Op;
const { getCurrency } = require('./currencyService');
const { NotFoundError, ValidationError } = require('../validators/errors');
const { orderReadyEmail } = require('./notificationService');

const checkDuplicateElements = function (array) {
  const duplicate = array.filter((value, index) => array.indexOf(value) !== index);
  if (duplicate.length !== 0) { throw new ValidationError('Can not have duplicate elements'); }
};

const getRandomDate = function () {
  const today = new Date();
  const future = new Date(today);
  future.setDate(today.getDate() + 3);
  const randomTimestamp = Math.random() * (future.getTime() - today.getTime()) + today.getTime();
  return new Date(randomTimestamp).toISOString().split('T')[0];
};

const priceCalculation = function (priceList, itemList) {
  let sum = 0;
  itemList.forEach((item) => {
    priceList.forEach((price) => {
      if (item.id === price.id) {
        sum += item.quantity * price.price;
      }
    });
  });
  return Number(sum.toFixed(2));
};

// Check for duplicate elements and verify all elements are present in database
exports.checkAllElements = async (model, req, res) => {
  const idList = req.body.itemList.map(el => el.id);
  checkDuplicateElements(idList);
  const items = await model.findAll({
    where: {
      id: { [Op.or]: idList }
    },
    attributes: ['id', 'serialNumber', 'quantity']
  });
  if (items.length !== idList.length) throw new NotFoundError();
};

// Create item order if requested quantity is less than what is in database or subtract quantity from item entity
exports.retrieveItemOnOrder = async (currentOrder, req, res) => {
  const t = await sequelize.transaction();
  const idList = currentOrder.dataValues.itemList.map(el => el.id);
  const items = await item.findAll({
    where: {
      id: { [Op.or]: idList }
    },
    attributes: ['id', 'quantity']
  });
  let hadToRequestItemOrder = false;

  try {
    currentOrder.itemList.forEach(async requestItem => {
      const orderItem = items.find(item => item.id === requestItem.id);
      if (orderItem.quantity < requestItem.quantity) {
        await order_item.create({
          orderId: currentOrder.id,
          itemId: requestItem.id,
          deliveryDate: getRandomDate()
        }, { transaction: t });
        hadToRequestItemOrder = true;
      } else {
        orderItem.quantity -= requestItem.quantity;
        await orderItem.save({ transaction: t });
      }
    });
    if (hadToRequestItemOrder) {
      currentOrder.orderStatus = 'pending_delivery';
    } else {
      currentOrder.orderStatus = 'ready_for_pickup';
      orderReadyEmail(currentOrder.id);
    }
    await currentOrder.save({ transaction: t });
    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error);
    throw new ValidationError('Something went wrong!');
  };
};

// Calculate full price based on user currency
exports.setOrderPrice = async (req, res) => {
  const customer = await user.findByPk(req.body.userId);
  const itemList = req.body.itemList.map(item => item.id);
  const customerCurrency = await getCurrency(customer.currency);
  const priceList = await item.findAll({
    where: {
      id: { [Op.or]: itemList }
    },
    attributes: ['id', 'price']
  });

  const fullPrice = priceCalculation(priceList, req.body.itemList);

  req.body.currency = customer.currency;
  req.body.fullPrice = customer.currency === 'EUR' ? fullPrice : (fullPrice * customerCurrency).toFixed(2);
  req.body.finalPrice = (fullPrice - (fullPrice * (customer.discount / 100))).toFixed(2);
};

exports.checkCustomerOrders = async (req, res) => {
  // const customer = await user.findByPk(req.body.userId);
  const orders = await order.findAll({
    where: {
      userId: req.body.userId,
      deleted: false
    }
  });
  if (orders.length > 4 && orders.orderStatus !== 'completed') {
    throw new ValidationError('User already has 5 orders that are not completed');
  };
};
