const express = require('express');
const morgan = require('morgan');
const router = require('./routers');
const { errorMiddleware } = require('./validators/errorHandler');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/', router);

app.use(errorMiddleware);

module.exports = app;
