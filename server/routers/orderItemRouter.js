const express = require('express');

const { getOrderedItems, updateOrderedItem } = require('../controllers/orderItemController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getOrderedItems));

router
  .route('/:firstId/:secondId')
  .put(restrictTo('Salesperson'), callbackErrorHandler(updateOrderedItem));

module.exports = router;
