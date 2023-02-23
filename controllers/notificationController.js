const { notification } = require('../db/models');
const crudController = require('./crudController');

exports.getAllNotifications = async (req, res) => {
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
  await notification.update({ deleted: true }, {
    where: { order_id: req.params.id }
  });
  res.status(204).json();
};
