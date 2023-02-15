const express = require('express');
const router = express.Router({ mergeParams: true });
const { callbackErrorHandler } = require('../utils/errorHandler');
const { getAllSettings, getSettings, createSettings } = require('../controllers/settingsController');

router
  .route('/')
  .get(callbackErrorHandler(getAllSettings))
  .post(callbackErrorHandler(createSettings));

router
  .route('/:id')
  .get(callbackErrorHandler(getSettings));

module.exports = router;
