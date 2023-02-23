const express = require('express');
// eslint-disable-next-line max-len
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getAllCategory))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createCategory));

router
  .route('/:id')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getCategory))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateCategory))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteCategory));

module.exports = router;
