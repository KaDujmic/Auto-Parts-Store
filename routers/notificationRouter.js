const express = require('express');
const { getNotifications, deleteNotification } = require('../controllers/notificationController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getNotifications));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getNotifications))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteNotification));

module.exports = router;
