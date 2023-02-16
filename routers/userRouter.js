const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../utils/errorHandler');
const { getUser, getAllUser, updateUser, createUser, deleteUser } = require('../controllers/userController');
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(callbackErrorHandler(getAllUser))
  .post(bodyValidator, callbackErrorHandler(createUser));

router
  .route('/:id')
  .get(callbackErrorHandler(getUser))
  .put(bodyValidator, callbackErrorHandler(updateUser))
  .delete(callbackErrorHandler(deleteUser));

module.exports = router;
