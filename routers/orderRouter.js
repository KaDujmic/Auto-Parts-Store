const express = require('express');
const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { callbackErrorHandler } = require('../utils/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getAllOrders))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createOrder));

router
  .route('/:id')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getOrder))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateOrder))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteOrder));
module.exports = router;
