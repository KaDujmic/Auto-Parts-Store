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

// Send at 9 AM, then check every third hour in the day if notifications failed to send prior
cron.schedule('0 9/6 * * *', function () {
  sendRecurringEmails();
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
  // Set cache keys on startup
  setCurrency();
  setSettings();
});
