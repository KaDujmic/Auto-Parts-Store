const express = require('express');
const morgan = require('morgan');
const router = require('./routers');
const { errorMiddleware } = require('./validators/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

app.use(errorMiddleware);

module.exports = app;
