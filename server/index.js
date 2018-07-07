const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const api = require('./api/v1/');

database.connect();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));
// parse application/json
app.use(bodyParser.json());

app.use('/api/v1', api);
app.use('/api', api);

app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Not found',
  });
});

app.use((req, res, next) => {
  res.status(400);
  res.json({
    message: 'Papi Bad request!!!',
  });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    message: err.message,
  });
});

module.exports = app;
