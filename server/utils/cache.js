const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });

// Function that sets the cache data for the given key
exports.setCache = (data, key) => {
  const cachedData = cache.set(key, data);
  cachedData
    ? console.log(`Data cached: ${key}`)
    : console.log(`Data not cached: ${key}`);
};

// Function that retrieves the cached data for the given key
exports.getCache = (key) => {
  const cachedData = cache.get(key);
  return cachedData;
};
