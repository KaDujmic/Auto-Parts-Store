const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../validators/errorHandler');
const { getItem, getAllItem, updateItem, createItem, deleteItem } = require('../controllers/itemController');
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getAllItem))
  .post(bodyValidator, callbackErrorHandler(createItem));

router
  .route('/:id')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getItem))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateItem))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteItem));

module.exports = router;
