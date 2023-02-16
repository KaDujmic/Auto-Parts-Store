const { ValidationError } = require('./errors.js');
const NOTIFICATION_LIST = require('./settingsHelper');

exports.verifySettings = async (model, req, res) => {
  const { key, value, template } = req.body;
  const notificationKey = await NOTIFICATION_LIST.find(el => el.key === key);
  if (notificationKey === undefined) {
    throw new ValidationError('Bad Request');
  }
  if (value < 1 || value > 10) {
    req.body.value = notificationKey.value;
  }
  if (!template) {
    req.body.template = notificationKey.template;
  }
};
