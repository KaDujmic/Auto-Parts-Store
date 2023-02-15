const NOTIFICATION_DEFAULT_KEY = 'order_notification_recurrence';

exports.verifyKey = async (model, req, res) => {
  const receivedKey = req.body.key;
  const dbKey = await model.findAll({
    where: {
      key: receivedKey
    }
  });
  if (!dbKey.length) {
    req.body.key = NOTIFICATION_DEFAULT_KEY;
  }
};
