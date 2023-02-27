const express = require('express');
const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder, getCustomerOrders, confirmOrder, completeOrder } = require('../controllers/orderController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getAllOrders))
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
