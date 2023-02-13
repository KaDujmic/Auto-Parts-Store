const express = require('express');
const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllOrders)
  .post(createOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);
module.exports = router;
