const express = require('express');

const { getManyManufacturer, getManufacturer, createManufacturer, updateManufacturer, deleteManufacturer } = require('../controllers/manufacturerController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { bodyValidator } = require('../middleware/dataValidator');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.get('/', callbackErrorHandler(getManyManufacturer));
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
