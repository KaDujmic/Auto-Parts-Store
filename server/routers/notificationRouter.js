const express = require('express');
const { getAllNotifications, getNotification, deleteNotification } = require('../controllers/notificationController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getAllNotifications));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getNotification))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteNotification));

module.exports = router;
