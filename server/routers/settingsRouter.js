const express = require('express');

const { getManySetting, getSettings, updateSettings } = require('../controllers/settingsController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getManySetting));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getSettings))
  .put(restrictTo('Salesperson'), callbackErrorHandler(updateSettings));

module.exports = router;
