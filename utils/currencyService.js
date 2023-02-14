const { currency } = require('../models');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.setCurrency = async () => {
  try {
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
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getCurrency = async (currency) => {
  const latestCurrency = await currency.findOne({
    order: [
      ['date', 'desc']
    ],
    limit: 1
  });

  if (!latestCurrency) throw new Error('Create bad request error');

  return latestCurrency.rates[currency];
};
