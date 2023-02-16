const express = require('express');
// eslint-disable-next-line max-len
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { callbackErrorHandler } = require('../utils/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(callbackErrorHandler(getAllCategory))
  .post(bodyValidator, callbackErrorHandler(createCategory));

router
  .route('/:id')
  .get(callbackErrorHandler(getCategory))
  .put(bodyValidator, callbackErrorHandler(updateCategory))
  .delete(callbackErrorHandler(deleteCategory));

module.exports = router;
