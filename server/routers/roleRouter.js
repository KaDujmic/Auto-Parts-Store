const express = require('express');

const { getManyRole, getRole, createRole, updateRole, deleteRole } = require('../controllers/roleController');
const { isLoggedIn, restrictTo } = require('../controllers/authController');
const { bodyValidator } = require('../middleware/dataValidator');
const { callbackErrorHandler } = require('../validators/errorHandler');

const router = express.Router({ mergeParams: true });

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getManyRole))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createRole));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getRole))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateRole))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteRole));

module.exports = router;
