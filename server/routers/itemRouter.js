const express = require('express');

const { getItem, getManyItem, updateItem, createItem, deleteItem } = require('../controllers/itemController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { bodyValidator } = require('../middleware/dataValidator');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.get('/', callbackErrorHandler(getManyItem));
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
