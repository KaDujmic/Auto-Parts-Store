const express = require('express');
const { getAllRole, getRole, createRole, updateRole, deleteRole } = require('../controllers/roleController');
const { callbackErrorHandler } = require('../utils/errorHandler');
const router = express.Router({ mergeParams: true });
const { bodyValidator } = require('../middleware/dataValidator');

router
  .route('/')
  .get(callbackErrorHandler(getAllRole))
  .post(bodyValidator, callbackErrorHandler(createRole));

router
  .route('/:id')
  .get(callbackErrorHandler(getRole))
  .put(bodyValidator, callbackErrorHandler(updateRole))
  .delete(callbackErrorHandler(deleteRole));

module.exports = router;
