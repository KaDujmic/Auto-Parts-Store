const { currency } = require('../db/models');
const cache = require('../utils/cache');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.setCurrency = async () => {
  try {
    // Get the cached currency and if exists for todays date, set it again and exit the function
    const currencyCached = cache.getCache('currency');
    if (currencyCached !== undefined && currencyCached.date === new Date().toISOString().split('T')[0]) return;
    // If cached data is wrong, find it in the database
    const latestCurrency = await currency.findOne({
      order: [
        ['date', 'desc']
      ],
      limit: 1
    });
    // If there is no data in the database for todays date, fetch it from the third party api
    if (!latestCurrency || latestCurrency.date !== new Date().toISOString().split('T')[0]) {
      const response = await fetch('https://api.exchangerate.host/latest');
      const currencies = await response.json();
      if (currencies.date === new Date().toISOString().split('T')[0]) {
        const newCurrencies = {
          date: currencies.date,
          rates: currencies.rates
        };
        await currency.create(newCurrencies);
        cache.setCache(newCurrencies.dataValues, 'currency');
      }
    } else {
      cache.setCache(latestCurrency.dataValues, 'currency');
    }
  } catch (err) {
    console.log(err);
  }
};

// Function that will fetch the rate for a specific currency
exports.getCurrency = async (curr) => {
  const cachedCurrency = cache.getCache('currency');
  if (!cachedCurrency) {
    const latestCurrency = await currency.findOne({
      order: [
        ['date', 'desc']
      ],
      limit: 1
    });

    if (!latestCurrency) throw new Error('Create bad request error');

    cache.setCache(latestCurrency.dataValues, 'currency');
    return latestCurrency.rates[curr];
  }
  return cachedCurrency.rates[curr];
};
