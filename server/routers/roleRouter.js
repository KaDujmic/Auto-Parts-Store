const express = require('express');
const { getAllRole, getRole, createRole, updateRole, deleteRole } = require('../controllers/roleController');
const { callbackErrorHandler } = require('../validators/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');
const { isLoggedIn, restrictTo } = require('../controllers/authController');

router.use(callbackErrorHandler(isLoggedIn));

router
  .route('/')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getAllRole))
  .post(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(createRole));

router
  .route('/:id')
  .get(restrictTo('Salesperson'), callbackErrorHandler(getRole))
  .put(restrictTo('Salesperson'), bodyValidator, callbackErrorHandler(updateRole))
  .delete(restrictTo('Salesperson'), callbackErrorHandler(deleteRole));

module.exports = router;
