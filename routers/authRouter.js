const express = require('express');
// eslint-disable-next-line max-len
const { login, isLoggedIn, getCustomerOrders } = require('../controllers/authController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });

router.post('/login', callbackErrorHandler(login));

router.use(isLoggedIn);

router
  .route('/userOrders')
  .get(callbackErrorHandler(getCustomerOrders));

module.exports = router;
