const { ValidationError } = require('./errors.js');
const cache = require('./cache');
const { settings } = require('../models');

exports.verifySettings = async (req) => {
  const { key, value } = req.body;

  if (key.includes('recurrence')) {
    if (value < 1 || value > 10) { throw new ValidationError('ERROR: Supported recurrence is between 1, and 10 days.'); }
  }
};

exports.setSettings = async () => {
  const key = 'settings';
  const retrievedCache = cache.getCache(key);
  const settingsEntity = await settings.findAll();

  if (retrievedCache) {
    cache.deleteCache(key);
  }
  cache.setCache(settingsEntity, key);
};
