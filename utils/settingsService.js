const { ValidationError } = require('./errors.js');
const cache = require('./cache');
const { settings } = require('../models/settings');
const { NOTIFICATION_LIST } = require('./settingsHelper');

exports.verifySettings = async (model, req, res) => {
  const { key, value } = req.body;
  const notificationKey = await NOTIFICATION_LIST.find(el => el.key === key);
  if (notificationKey === undefined) {
    throw new ValidationError('Bad Request');
  }
  if (key.includes('recurrence')) {
    if (value < 1 || value > 10) { throw new ValidationError('Bad Request'); }
  }
};

exports.setSettings = async () => {
  const settingsCache = cache.getCache('settingsCache');
  if (!settingsCache) {
    const settingsEntity = await settings.findAll();
    cache.setCache(settingsEntity, 'settingsCache');
  }
};
