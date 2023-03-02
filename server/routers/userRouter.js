const express = require('express');

const { getUser, getManyUser, updateUser, createUser, deleteUser } = require('../controllers/userController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { bodyValidator } = require('../middleware/dataValidator');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getManyUser))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createUser));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getUser))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateUser))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteUser));

module.exports = router;
