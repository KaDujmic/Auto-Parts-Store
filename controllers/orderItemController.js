const { order_item, Sequelize } = require('../db/models');
const { orderStatusCheck } = require('../controllers/orderController');
const Op = Sequelize.Op;
const { NotFoundError } = require('../validators/errors');

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
  const model = await order_item.update({ status: 'delivered' }, {
    where: { orderId: firstId, itemId: secondId, deleted: false },
    returning: true,
    hooks: true
  });
  if (model[0] === 0) throw new NotFoundError('Requested resource could not be found. Please review the submitted parameters.');
  orderStatusCheck(req, res);
  res.status(200).json(model);
};
