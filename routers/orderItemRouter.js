const express = require('express');
const { getOrderedItems, updateOrderedItem } = require('../controllers/orderItemController');
const { callbackErrorHandler } = require('../utils/errorHandler');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getOrderedItems));

router
  .route('/:firstId/:secondId')
  .put(restrictTo('Salesperson'), callbackErrorHandler(updateOrderedItem));

module.exports = router;
