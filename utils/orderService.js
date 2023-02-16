const { Sequelize } = require('../models');
const Op = Sequelize.Op;
const { NotFoundError } = require('./errors');

function onlyUnique (value, index, array) {
  return array.indexOf(value) === index;
}
function getRandomDate () {
  const today = new Date();
  const future = new Date(today);
  future.setDate(today.getDate() + 3);
  const randomTimestamp = Math.random() * (future.getTime() - today.getTime()) + today.getTime();
  return new Date(randomTimestamp);
};

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
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      req.body.deliveryDate = new Date(tomorrow);
    };
  });
};
