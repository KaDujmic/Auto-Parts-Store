const express = require('express');
// eslint-disable-next-line max-len
const { getAllManufacturer, getManufacturer, createManufacturer, updateManufacturer, deleteManufacturer } = require('../controllers/manufacturerController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getAllManufacturer))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createManufacturer));

router
  .route('/:id')
  .get(restrictTo('Salesperson', 'Customer'), callbackErrorHandler(getManufacturer))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateManufacturer))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteManufacturer));

module.exports = router;
