const express = require('express');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');
const settingsRouter = require('./settingsRouter');
const manufacturerRouter = require('./manufacturerRouter');
const categoryRouter = require('./categoryRouter');
const roleRouter = require('./roleRouter');
const authRouter = require('./authRouter');
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
router.use('/', authRouter);

module.exports = router;
