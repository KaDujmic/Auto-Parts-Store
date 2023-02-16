const express = require('express');
const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { callbackErrorHandler } = require('../utils/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(callbackErrorHandler(getAllOrders))
  .post(bodyValidator, callbackErrorHandler(createOrder));

router
  .route('/:id')
  .get(callbackErrorHandler(getOrder))
  .put(bodyValidator, callbackErrorHandler(updateOrder))
  .delete(callbackErrorHandler(deleteOrder));
module.exports = router;
