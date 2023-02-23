const { ValidationError } = require('../validators/errors.js');
const cache = require('../utils/cache');
const { settings } = require('../db/models');

// Create restraint for recurrence
exports.verifySettings = async (req) => {
  const { key, value } = req.body;

  if (key.includes('recurrence')) {
    if (value < 1 || value > 10) { throw new ValidationError('ERROR: Supported recurrence is between 1, and 10 days.'); }
  }
};

// Create cache for settings
exports.setSettings = async () => {
  const key = 'settings';
  const retrievedCache = cache.getCache(key);
  const settingsEntity = await settings.findAll();

  if (retrievedCache) {
    cache.deleteCache(key);
  }
  cache.setCache(settingsEntity, key);
};
