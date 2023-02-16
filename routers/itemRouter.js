const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../utils/errorHandler');
const { getItem, getAllItem, updateItem, createItem, deleteItem } = require('../controllers/itemController');
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(callbackErrorHandler(getAllItem))
  .post(bodyValidator, callbackErrorHandler(createItem));

router
  .route('/:id')
  .get(callbackErrorHandler(getItem))
  .put(bodyValidator, callbackErrorHandler(updateItem))
  .delete(callbackErrorHandler(deleteItem));

module.exports = router;
