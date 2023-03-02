const { notification } = require('../db/models');
const { NotFoundError } = require('../validators/errors');

exports.getManyNotification = async (req, res) => {
  const foundNotifications = await notification.findAll({
    where: { deleted: false }
  });
  res.status(200).json(foundNotifications);
};

exports.getNotification = async (req, res) => {
  const foundNotification = await notification.findOne({
    where: { order_id: req.params.id, deleted: false }
  });
  res.status(200).json(foundNotification);
};

exports.deleteNotification = async (req, res) => {
  const model = await notification.update({ deleted: true }, {
    where: { order_id: req.params.id }
  });
  if (model[0] === 0) throw new NotFoundError('Requested resource could not be found. Please review the submitted parameters.');
  res.status(204).json();
};
