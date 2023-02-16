const express = require('express');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');
const settingsRouter = require('./settingsRouter');
const manufacturerRouter = require('./itemRouter');
const categoryRouter = require('./orderRouter');
const roleRouter = require('./userRouter');
const settingsHelperRouter = require('./settingsHelperRouter');

const router = express.Router({ mergeParams: true });

router.use('/item', itemRouter);
router.use('/order', orderRouter);
router.use('/user', userRouter);
router.use('/settings', settingsRouter);
router.use('/category', categoryRouter);
router.use('/manufacturer', manufacturerRouter);
router.use('/role', roleRouter);
router.use('/settingsHelper', settingsHelperRouter);

module.exports = router;
