const app = require('./app');
const cron = require('node-cron');
const { setCurrency } = require('./services/currencyService');
const { setSettings } = require('./services/settingsService');
const { sendRecurringEmails, verifyItemArrivedEmail } = require('./services/notificationService');

const port = process.env.PORT || 8080;

cron.schedule('0 * * * *', function () {
  setCurrency();
  setSettings();
});

// Send at 9 AM, then check every third hour in the day if notifications failed to send prior
cron.schedule('0 9/3 * * *', function () {
  sendRecurringEmails();
});
cron.schedule('0 9 * * *', function () {
  verifyItemArrivedEmail();
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
  // Set cache keys on startup
  setCurrency();
  setSettings();
  // On server startup send arrived items email
  verifyItemArrivedEmail();
});
