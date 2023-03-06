const { order_item, Sequelize, item } = require('../db/models');
const { orderStatusCheck } = require('./orderController');
const Op = Sequelize.Op;
const { NotFoundError } = require('../validators/errors');

// Function to fetch all items that need to arrive today or before
exports.getOrderedItems = async (req, res) => {
  const items = await order_item.findAll({
    include: [
      {
        model: item,
        attributes: ['name']
      }
    ],
    where: {
      deliveryDate: {
        [Op.lte]: new Date().toISOString().split('T')[0]
      },
      deleted: false
    }
  });

  res.status(200).json(items);
};

// Function to change ordered item status to delivered
exports.updateOrderedItem = async (req, res) => {
  const { firstId, secondId } = req.params;
  const model = await order_item.update({ status: 'delivered', deleted: true }, {
    where: { orderId: firstId, itemId: secondId, deleted: false },
    returning: true
  });
  if (model[0] === 0) throw new NotFoundError();
  orderStatusCheck(req, res);
  res.status(200).json(model[1]);
};
