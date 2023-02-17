const { Sequelize, user, item } = require('../models');
const Op = Sequelize.Op;
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
  return new Date(randomTimestamp);
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

  items.forEach(el => {
    const requestItem = req.body.itemList.find(item => item.id === el.id);
    if (el.quantity < requestItem.quantity) {
      req.body.deliveryDate = getRandomDate();
    } else {
      const savePromises = items.map(item => {
        const requestItem = req.body.itemList.find(requestItem => requestItem.id === item.id);
        item.quantity -= requestItem.quantity;
        return item.save();
      });
      Promise.all(savePromises);
    }
  });
};

exports.setOrderPrice = async (req, res) => {
  const customer = await user.findByPk(req.body.userId);
  const itemList = req.body.itemList.map(item => item.id);
  const priceList = await item.findAll({
    where: {
      id: { [Op.or]: itemList }
    },
    attributes: ['id', 'price']
  });

  const fullPrice = priceCalculation(priceList, req.body.itemList);

  req.body.fullPrice = fullPrice;
  req.body.finalPrice = fullPrice - (fullPrice * (customer.discount / 100));
};