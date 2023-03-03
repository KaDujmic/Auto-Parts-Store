const crudController = require('./crudController');
const { notification } = require('../db/models');
const { NotFoundError } = require('../validators/errors');

exports.getManyNotification = async (req, res) => {
  const query = { order: [['userId', 'ASC']] };
  await crudController.findManyModel(notification, query, req, res);
};

exports.getNotification = async (req, res) => {
  const query = {
    where: { order_id: req.params.id },
    order: [['userId', 'ASC']]
  };
  await crudController.findModel(notification, query, req, res);
};

exports.deleteNotification = async (req, res) => {
  const model = await notification.update({ deleted: true }, {
    where: { order_id: req.params.id }
  });
  if (model[0] === 0) throw new NotFoundError();
  res.status(204).json();
};
