const express = require('express');

const { getManyNotification, getNotification, deleteNotification } = require('../controllers/notificationController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getManyNotification));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getNotification))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteNotification));

module.exports = router;
