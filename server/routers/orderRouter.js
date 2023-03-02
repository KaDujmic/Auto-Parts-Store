const express = require('express');

const { getManyOrder, getOrder, createOrder, updateOrder, deleteOrder, getCustomerOrders, confirmOrder, completeOrder } = require('../controllers/orderController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { bodyValidator } = require('../middleware/dataValidator');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getManyOrder))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createOrder));

router
  .route('/userOrders')
  .get(callbackErrorHandler(getCustomerOrders));

router
  .route('/:id')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getOrder))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateOrder))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteOrder));

router
  .route('/confirm/:id')
  .put(restrictTo('Salesperson'), callbackErrorHandler(confirmOrder));

router
  .route('/complete/:id')
  .put(restrictTo('Salesperson'), callbackErrorHandler(completeOrder));

module.exports = router;
