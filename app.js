const express = require('express');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());

module.exports = app;