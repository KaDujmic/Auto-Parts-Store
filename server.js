const app = require('./app');
const cron = require('node-cron');
const { setCurrency } = require('./utils/currencyService');
const { setSettings } = require('./utils/settingsService');
const { sendRecurringEmails } = require('./utils/notificationService');

const port = process.env.PORT || 8080;

cron.schedule('0 * * * *', function () {
  setCurrency();
  setSettings();
});

cron.schedule('0 9 * * *', function () {
  sendRecurringEmails('order_pickup_template', 'order_pickup_recurrence');
  sendRecurringEmails('item_arrival_template', 'item_arrival_recurrence');
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
  // Set cache keys on startup
  setCurrency();
  setSettings();
});
