const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../validators/errorHandler');
const { getAllSettings, getSettings, createSettings } = require('../controllers/settingsController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getAllSettings))
  .post(restrictTo('Salesperson'), callbackErrorHandler(createSettings));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getSettings));

module.exports = router;
