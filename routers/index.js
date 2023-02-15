const express = require('express');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');
const settingsRouter = require('./settingsRouter');

const router = express.Router({ mergeParams: true });

router.use('/item', itemRouter);
router.use('/order', orderRouter);
router.use('/user', userRouter);
router.use('/settings', settingsRouter);

module.exports = router;
