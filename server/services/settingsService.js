const { ValidationError } = require('../validators/errors.js');
const cache = require('../utils/cache');
const { settings } = require('../db/models');
const MIN_VALUE = 1;
const MAX_VALUE = 10;
const KEY_STRING = 'recurrence';

// Create restraint for recurrence
exports.verifySettings = async (req) => {
  const { key, value } = req.body;
  if (key.includes(KEY_STRING)) {
    if (value < MIN_VALUE || value > MAX_VALUE) {
      throw new ValidationError(`ERROR: Supported recurrence is between ${MIN_VALUE}, and ${MAX_VALUE} days.`);
    }
  }
};

// Create cache for settings, or overwrite with new data if key exists
exports.setSettings = async () => {
  const key = 'settings';
  const settingsEntity = await settings.findAll();
  cache.setCache(settingsEntity, key);
};
