const express = require('express');
const { getAllManufacturer, getManufacturer, createManufacturer, updateManufacturer, deleteManufacturer } = require('../controllers/manufacturerController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.get('/', callbackErrorHandler(getAllManufacturer));
router.get('/:id', callbackErrorHandler(getManufacturer));
router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createManufacturer));

router
  .route('/:id')
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateManufacturer))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteManufacturer));

module.exports = router;
