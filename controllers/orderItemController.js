const { order_item, Sequelize } = require('../models');
const Op = Sequelize.Op;

exports.getOrderedItems = async (req, res) => {
  const items = await order_item.findAll({
    where: {
      deliveryDate: {
        [Op.lte]: new Date().toISOString().split('T')[0]
      },
      deleted: false
    }
  });

  res.status(200).json(items);
};

exports.updateOrderedItem = async (req, res) => {
  const { firstId, secondId } = req.params;
  const items = await order_item.update({ deleted: true }, {
    where: { orderId: firstId, itemId: secondId, deleted: false },
    returning: true
  });
  res.status(200).json(items);
};
