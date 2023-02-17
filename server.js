const app = require('./app');
const { setCurrency } = require('./utils/currencyService');
const { sendRecurringEmails } = require('./utils/notificationServbice');
const cron = require('node-cron');

const port = process.env.PORT || 8080;

cron.schedule('0 * * * *', function () {
  setCurrency();
});

cron.schedule('0 9 * * *', function () {
  sendRecurringEmails();
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
