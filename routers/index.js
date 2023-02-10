const express = require('express');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');

const router = express.Router({ mergeParams: true });

router.use('/item', itemRouter);
router.use('/order', orderRouter);
router.use('/user', userRouter);

module.exports = router;
