const app = require('./app');
const { setCurrency } = require('./utils/currencyService');
const cron = require('node-cron');

const port = process.env.PORT || 8080;

cron.schedule('0 * * * *', function () {
  setCurrency();
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
