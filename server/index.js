const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database');

const api = require('./api/v1/');

database.connect();

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));
// parse application/json
app.use(bodyParser.json());

app.use('/api/v1', api);
app.use('/api', api);

const errorMessage = text => ({
  error: true,
  message: text,
});

app.use((req, res, next) => {
  res.status(404);
  res.json(errorMessage('Not found'));
});

app.use((err, req, res, next) => {
  let {
    statusCode = 500, message,
  } = err;

  switch (err.type) {
    case 'entity.parse.failed':
      message = `Bad Request: ${err.message}`;
      break;
    default:
      if (err.message.startsWith('ValidationError')) {
        statusCode = 422;
      }
      break;
  }

  res.status(statusCode);
  res.json(errorMessage(message));
});

module.exports = app;
