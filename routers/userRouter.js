const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../validators/errorHandler');
const { getUser, getAllUser, updateUser, createUser, deleteUser } = require('../controllers/userController');
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getAllUser))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createUser));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getUser))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateUser))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteUser));

module.exports = router;
