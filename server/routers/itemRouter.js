const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../validators/errorHandler');
const { getItem, getAllItem, updateItem, createItem, deleteItem } = require('../controllers/itemController');
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.get('/', callbackErrorHandler(getAllItem));
router.get('/:id', callbackErrorHandler(getItem));
router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .post(bodyValidator, callbackErrorHandler(createItem));

router
  .route('/:id')
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateItem))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteItem));

module.exports = router;
