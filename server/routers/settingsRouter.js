const express = require('express');

const { getManySetting, getSettings, updateSettings, deleteSettings } = require('../controllers/settingsController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getManySetting))
  .post(restrictTo('Salesperson'), callbackErrorHandler(updateSettings));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getSettings))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteSettings));

module.exports = router;
