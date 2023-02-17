const { order_item, order, Sequelize } = require('../models');
const Op = Sequelize.Op;
const { NotFoundError } = require('./errors');

exports.verifyItemArrival = async () => {
  const itemId = await order_item.findAll({
    where: {
      deliveryDate: null
    },
    attributes: ['orderId']
  });
  if (!itemId) throw new NotFoundError();
  const orderId = itemId.map(el => el.orderId);
  const orders = await order.findAll({
    where: {
      id: { [Op.or]: orderId }
    }
  });

  // not tested
  orders.forEach(el => {
    el.orderStatus = 'Ready for Delivery';
    el.save();
  });
};
