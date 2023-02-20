const { ValidationError } = require('./errors.js');
const cache = require('./cache');
const { settings } = require('../models/settings');

exports.verifySettings = async (req) => {
  const { key, value } = req.body;

  if (key.includes('recurrence')) {
    if (value < 1 || value > 10) { throw new ValidationError('ERROR: Supported recurrence is between 1, and 10 days.'); }
  }
};

exports.setSettings = async () => {
  const settingsCache = cache.getCache('settingsCache');
  if (!settingsCache) {
    const settingsEntity = await settings.findAll();
    cache.setCache(settingsEntity, 'settingsCache');
  }
};

exports.refreshSettings = async () => {
  const key = 'settingsCache';
  const retrievedCache = cache.getCache(key);

  if (!retrievedCache) {
    const settingsEntity = await settings.findAll();
    cache.setCache(settingsEntity, key);
  } else {
    cache.ttl(key, 3600);
  }
};
