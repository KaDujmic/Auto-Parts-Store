const express = require('express');
const router = express.Router({ mergeParams: true });
const { getUser, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/itemController');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
