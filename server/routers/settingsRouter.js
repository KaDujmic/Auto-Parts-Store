const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../validators/errorHandler');
const { getAllSettings, getSettings, updateSettings } = require('../controllers/settingsController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getAllSettings));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getSettings))
  .put(restrictTo('Salesperson'), callbackErrorHandler(updateSettings));

module.exports = router;
