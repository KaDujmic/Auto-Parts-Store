const { Sequelize } = require('../models');
const Op = Sequelize.Op;
const { NotFoundError } = require('./errors');
const { getRandomDate } = require('./generateDate');

function onlyUnique (value, index, array) {
  return array.indexOf(value) === index;
}

exports.checkAllElements = async (model, req, res) => {
  const idList = req.body.itemList.map(el => el.id);
  const uniqueIdList = idList.filter(onlyUnique);
  const items = await model.findAll({
    where: {
      id: { [Op.or]: uniqueIdList }
    },
    attributes: ['id', 'serialNumber', 'quantity']
  });
  if (items.length !== uniqueIdList.length) throw new NotFoundError();
  items.forEach(el => {
    const requestItem = req.body.itemList.find(item => item.id === el.id);
    if (el.quantity < requestItem.quantity) {
      req.body.deliveryDate = getRandomDate();
    } else req.body.deliveryDate = new Date();
  });
};
