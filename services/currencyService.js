const { currency } = require('../db/models');
const cache = require('../utils/cache');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.setCurrency = async () => {
  try {
    // Get the cached currency and if exists for todays date, set ttl to 1h exit the function
    const currencyCached = cache.getCache('currency');
    if (currencyCached !== undefined && currencyCached.date === new Date().toISOString().split('T')[0]) return;
    // cached currency is outdated, check the database if there is todays date currency, if there is set it, if not get it from the api
    const latestCurrency = await currency.findOne({
      order: [
        ['date', 'desc']
      ],
      limit: 1
    });
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
