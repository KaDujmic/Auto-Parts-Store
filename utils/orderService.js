const { Sequelize, user, item, order_item } = require('../models');
const Op = Sequelize.Op;
const { getCurrency } = require('./currencyService');
const { NotFoundError, ValidationError } = require('./errors');

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
  return sum;
};

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

exports.retriveItemOnOrder = async (currentOrder, req, res) => {
  const idList = currentOrder.itemList.map(el => el.id);
  const items = await item.findAll({
    where: {
      id: { [Op.or]: idList }
    },
    attributes: ['id', 'quantity']
  });
  currentOrder.itemList.forEach(requestItem => {
    const orderItem = items.find(item => item.id === requestItem.id);
    if (orderItem.quantity < requestItem.quantity) {
      const promise = order_item.create({
        orderId: currentOrder.id,
        itemId: requestItem.id,
        deliveryDate: getRandomDate()
      });
      promise.then((createdItem) => {
        console.log('Created order item:', createdItem);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      orderItem.quantity -= requestItem.quantity;
      orderItem.save();
    }
  });
};

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
