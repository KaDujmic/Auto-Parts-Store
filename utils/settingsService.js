const { ValidationError } = require('./errors.js');
const cache = require('./cache');
const { settings } = require('../models/settings');
const { NOTIFICATION_LIST } = require('./settingsHelper');

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

exports.setSettings = async () => {
  const settingsCache = cache.getCache('emailCache');
  if (!settingsCache) {
    const notificationList = await settings.findAll();
    cache.setCache(notificationList, 'emailCache');
  }
};
