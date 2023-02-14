const express = require('express');
const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { callbackErrorHandler } = require('../utils/errorHandler');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(callbackErrorHandler(getAllOrders))
  .post(callbackErrorHandler(createOrder));

router
  .route('/:id')
  .get(callbackErrorHandler(getOrder))
  .put(callbackErrorHandler(updateOrder))
  .delete(callbackErrorHandler(deleteOrder));
module.exports = router;
