const { order_item, Sequelize } = require('../models');
const Op = Sequelize.Op;

exports.getOrderedItems = async (req, res) => {
  const items = await order_item.findAll({
    where: {
      deliveryDate: {
        [Op.gte]: new Date().toISOString().split('T')[0]
      }
    }
  });
  res.status(200).json(items);
};
