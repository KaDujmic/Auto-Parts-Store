const { ValidationError } = require('./errors.js');
const NOTIFICATION_LIST = require('./settingsHelper');

exports.verifySettings = async (model, req, res) => {
  const receivedKey = req.body.key;
  const receivedValue = req.body.value;
  const receivedTemplate = req.body.template;
  const notificationKey = await NOTIFICATION_LIST.find(el => el.key === receivedKey);
  if (notificationKey === undefined) {
    throw new ValidationError('Bad Request');
  }
  if (receivedValue < 1 || receivedValue > 10) {
    req.body.value = notificationKey.value;
  }
  if (!receivedTemplate) {
    req.body.template = notificationKey.template;
  }
};
