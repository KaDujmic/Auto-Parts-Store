const express = require('express');

const { getManyCategory, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { bodyValidator } = require('../middleware/dataValidator');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.get('/', callbackErrorHandler(getManyCategory));
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
