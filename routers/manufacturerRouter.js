const express = require('express');
// eslint-disable-next-line max-len
const { getAllManufacturer, getManufacturer, createManufacturer, updateManufacturer, deleteManufacturer } = require('../controllers/manufacturerController');
const { callbackErrorHandler } = require('../utils/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');

router
  .route('/')
  .get(callbackErrorHandler(getAllManufacturer))
  .post(bodyValidator, callbackErrorHandler(createManufacturer));

router
  .route('/:id')
  .get(callbackErrorHandler(getManufacturer))
  .put(bodyValidator, callbackErrorHandler(updateManufacturer))
  .delete(callbackErrorHandler(deleteManufacturer));

module.exports = router;
