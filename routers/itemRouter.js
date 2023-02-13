const express = require('express');
const router = express.Router({ mergeParams: true });
const { getItem, getAllItem, updateItem, createItem, deleteItem } = require('../controllers/itemController');

router
  .route('/')
  .get(getAllItem)
  .post(createItem);

router
  .route('/:id')
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
