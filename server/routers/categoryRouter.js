const express = require('express');
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.get('/', callbackErrorHandler(getAllCategory));
router.get('/:id', callbackErrorHandler(getCategory));
router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createCategory));

router
  .route('/:id')
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateCategory))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteCategory));

module.exports = router;
