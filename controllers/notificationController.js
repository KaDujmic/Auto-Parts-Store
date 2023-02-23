const { notification } = require('../db/models');
const crudController = require('./crudController');

exports.getNotifications = async (req, res) => {
  const foundNotifications = await notification.findAll({
    where: { id: req.params.id, deleted: false }
  });
  res.status(200).json(foundNotifications);
};

exports.deleteNotification = async (req, res) => {
  await crudController.deleteModel(notification, req, res);
};
